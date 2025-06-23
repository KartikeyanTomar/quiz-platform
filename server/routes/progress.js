
const express = require('express');
const Progress = require('../models/Progress');
const QuizAttempt = require('../models/QuizAttempt');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get user's overall progress
router.get('/', protect, async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user.id });
    
    if (!progress) {
      progress = await Progress.create({
        user: req.user.id,
        subjects: [],
        globalStats: {
          totalQuizzesCompleted: 0,
          totalTimeSpent: 0,
          averageScore: 0,
          favoriteSubject: null,
          studyStreak: {
            current: 0,
            longest: 0,
            lastStudyDate: null
          }
        }
      });
    }

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching progress'
    });
  }
});

// Get progress for specific subject
router.get('/subject/:subjectId', protect, async (req, res) => {
  try {
    const { subjectId } = req.params;
    
    const progress = await Progress.findOne({ user: req.user.id });
    const subjectProgress = progress?.subjects.find(s => s.subjectId === subjectId);
    
    if (!subjectProgress) {
      return res.json({
        success: true,
        progress: {
          subjectId,
          subtopics: [],
          overallProgress: 0,
          totalTimeSpent: 0,
          totalQuizzesCompleted: 0,
          averageScore: 0,
          lastActivity: null
        }
      });
    }

    res.json({
      success: true,
      progress: subjectProgress
    });
  } catch (error) {
    console.error('Get subject progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subject progress'
    });
  }
});

// Get recent quiz attempts
router.get('/recent', protect, async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const recentAttempts = await QuizAttempt.find({ user: req.user.id })
      .populate('quiz', 'title subject subtopic difficulty')
      .sort({ completedAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      attempts: recentAttempts.map(attempt => ({
        id: attempt._id,
        quiz: attempt.quiz,
        score: attempt.score,
        correctAnswers: attempt.correctAnswers,
        totalQuestions: attempt.totalQuestions,
        timeSpent: attempt.timeSpent,
        completedAt: attempt.completedAt,
        status: attempt.status
      }))
    });
  } catch (error) {
    console.error('Get recent attempts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching recent attempts'
    });
  }
});

// Get analytics data
router.get('/analytics', protect, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get quiz attempts in the period
    const attempts = await QuizAttempt.find({
      user: req.user.id,
      completedAt: { $gte: startDate }
    }).populate('quiz', 'subject subtopic');

    // Calculate analytics
    const analytics = {
      totalAttempts: attempts.length,
      averageScore: attempts.length > 0 ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length : 0,
      totalTimeSpent: attempts.reduce((sum, a) => sum + a.timeSpent, 0),
      subjectBreakdown: {},
      scoreDistribution: {
        excellent: 0, // 90-100%
        good: 0,      // 70-89%
        average: 0,   // 50-69%
        poor: 0       // <50%
      },
      dailyActivity: []
    };

    // Subject breakdown
    attempts.forEach(attempt => {
      const subject = attempt.quiz.subject;
      if (!analytics.subjectBreakdown[subject]) {
        analytics.subjectBreakdown[subject] = {
          attempts: 0,
          averageScore: 0,
          timeSpent: 0
        };
      }
      analytics.subjectBreakdown[subject].attempts += 1;
      analytics.subjectBreakdown[subject].averageScore = 
        ((analytics.subjectBreakdown[subject].averageScore * (analytics.subjectBreakdown[subject].attempts - 1)) + attempt.score) 
        / analytics.subjectBreakdown[subject].attempts;
      analytics.subjectBreakdown[subject].timeSpent += attempt.timeSpent;
    });

    // Score distribution
    attempts.forEach(attempt => {
      if (attempt.score >= 90) analytics.scoreDistribution.excellent++;
      else if (attempt.score >= 70) analytics.scoreDistribution.good++;
      else if (attempt.score >= 50) analytics.scoreDistribution.average++;
      else analytics.scoreDistribution.poor++;
    });

    // Daily activity (simplified)
    const dailyMap = new Map();
    attempts.forEach(attempt => {
      const date = attempt.completedAt.toISOString().split('T')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { date, attempts: 0, averageScore: 0, totalScore: 0 });
      }
      const day = dailyMap.get(date);
      day.attempts++;
      day.totalScore += attempt.score;
      day.averageScore = day.totalScore / day.attempts;
    });
    analytics.dailyActivity = Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      success: true,
      analytics,
      period,
      startDate,
      endDate: now
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics'
    });
  }
});

module.exports = router;
