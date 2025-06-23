
const express = require('express');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get quiz by path
router.get('/:subject/:subtopic', async (req, res) => {
  try {
    const { subject, subtopic } = req.params;
    const quizPath = `${subject}/${subtopic}`;
    
    const quiz = await Quiz.findOne({ path: quizPath, isActive: true });
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Don't send correct answers to client
    const quizData = {
      id: quiz._id,
      title: quiz.title,
      subject: quiz.subject,
      subtopic: quiz.subtopic,
      description: quiz.description,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions.map(q => ({
        id: q.id,
        type: q.type,
        question: q.question,
        options: q.options,
        difficulty: q.difficulty,
        points: q.points
      }))
    };

    res.json({
      success: true,
      quiz: quizData
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching quiz'
    });
  }
});

// Submit quiz attempt
router.post('/:subject/:subtopic/submit', protect, async (req, res) => {
  try {
    const { subject, subtopic } = req.params;
    const { answers, timeSpent, startedAt } = req.body;
    const quizPath = `${subject}/${subtopic}`;
    
    const quiz = await Quiz.findOne({ path: quizPath, isActive: true });
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const processedAnswers = [];

    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        isCorrect = parseInt(userAnswer) === question.correct;
      } else if (question.type === 'fill-blank') {
        isCorrect = userAnswer?.toLowerCase().trim() === question.correct.toLowerCase().trim();
      }

      if (isCorrect) correctAnswers++;

      processedAnswers.push({
        questionId: question.id,
        answer: userAnswer,
        isCorrect,
        timeSpent: 0 // Could track per-question time in future
      });
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const completedAt = new Date();

    // Create quiz attempt
    const attempt = await QuizAttempt.create({
      user: req.user.id,
      quiz: quiz._id,
      quizPath,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeSpent,
      timeLimit: quiz.timeLimit,
      startedAt: new Date(startedAt),
      completedAt,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Update quiz metadata
    quiz.metadata.totalAttempts += 1;
    quiz.metadata.averageScore = ((quiz.metadata.averageScore * (quiz.metadata.totalAttempts - 1)) + score) / quiz.metadata.totalAttempts;
    quiz.metadata.averageTimeSpent = ((quiz.metadata.averageTimeSpent * (quiz.metadata.totalAttempts - 1)) + timeSpent) / quiz.metadata.totalAttempts;
    await quiz.save();

    // Update user progress
    await updateUserProgress(req.user.id, subject, subtopic, score, timeSpent);

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      result: {
        score,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        timeSpent,
        percentage: score
      }
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting quiz'
    });
  }
});

// Get quiz history for user
router.get('/history', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, subject, subtopic } = req.query;
    
    const filter = { user: req.user.id };
    if (subject) filter.quizPath = new RegExp(`^${subject}`);
    if (subtopic) filter.quizPath = `${subject}/${subtopic}`;

    const attempts = await QuizAttempt.find(filter)
      .populate('quiz', 'title subject subtopic difficulty')
      .sort({ completedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await QuizAttempt.countDocuments(filter);

    res.json({
      success: true,
      attempts: attempts.map(attempt => ({
        id: attempt._id,
        quiz: attempt.quiz,
        score: attempt.score,
        correctAnswers: attempt.correctAnswers,
        totalQuestions: attempt.totalQuestions,
        timeSpent: attempt.timeSpent,
        completedAt: attempt.completedAt,
        status: attempt.status
      })),
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching quiz history'
    });
  }
});

// Helper function to update user progress
async function updateUserProgress(userId, subject, subtopic, score, timeSpent) {
  try {
    let progress = await Progress.findOne({ user: userId });
    
    if (!progress) {
      progress = await Progress.create({
        user: userId,
        subjects: []
      });
    }

    // Find or create subject progress
    let subjectProgress = progress.subjects.find(s => s.subjectId === subject);
    if (!subjectProgress) {
      subjectProgress = {
        subjectId: subject,
        subtopics: [],
        overallProgress: 0,
        totalTimeSpent: 0,
        totalQuizzesCompleted: 0,
        averageScore: 0,
        lastActivity: new Date()
      };
      progress.subjects.push(subjectProgress);
    }

    // Find or create subtopic progress
    let subtopicProgress = subjectProgress.subtopics.find(st => st.subtopicId === subtopic);
    if (!subtopicProgress) {
      subtopicProgress = {
        subtopicId: subtopic,
        quizzesCompleted: 0,
        totalQuizzes: 10, // Default, should be calculated based on available quizzes
        averageScore: 0,
        bestScore: 0,
        timeSpent: 0,
        lastActivity: new Date()
      };
      subjectProgress.subtopics.push(subtopicProgress);
    }

    // Update subtopic progress
    subtopicProgress.quizzesCompleted += 1;
    subtopicProgress.averageScore = ((subtopicProgress.averageScore * (subtopicProgress.quizzesCompleted - 1)) + score) / subtopicProgress.quizzesCompleted;
    subtopicProgress.bestScore = Math.max(subtopicProgress.bestScore, score);
    subtopicProgress.timeSpent += timeSpent;
    subtopicProgress.lastActivity = new Date();

    // Update subject progress
    subjectProgress.totalQuizzesCompleted += 1;
    subjectProgress.averageScore = ((subjectProgress.averageScore * (subjectProgress.totalQuizzesCompleted - 1)) + score) / subjectProgress.totalQuizzesCompleted;
    subjectProgress.totalTimeSpent += timeSpent;
    subjectProgress.lastActivity = new Date();

    // Calculate overall progress (simplified)
    const completedSubtopics = subjectProgress.subtopics.filter(st => st.quizzesCompleted > 0).length;
    const totalSubtopics = subjectProgress.subtopics.length;
    subjectProgress.overallProgress = Math.round((completedSubtopics / totalSubtopics) * 100);

    // Update global stats
    progress.globalStats.totalQuizzesCompleted += 1;
    progress.globalStats.totalTimeSpent += timeSpent;
    progress.globalStats.averageScore = ((progress.globalStats.averageScore * (progress.globalStats.totalQuizzesCompleted - 1)) + score) / progress.globalStats.totalQuizzesCompleted;

    await progress.save();
  } catch (error) {
    console.error('Update progress error:', error);
  }
}

module.exports = router;
