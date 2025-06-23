
const express = require('express');
const Subject = require('../models/Subject');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true })
      .sort({ order: 1, name: 1 });

    // Calculate quiz counts for each subject
    const subjectsWithQuizCounts = await Promise.all(
      subjects.map(async (subject) => {
        const quizCount = await Quiz.countDocuments({ 
          subject: subject.id, 
          isActive: true 
        });

        const subtopicsWithQuizCounts = await Promise.all(
          subject.subtopics.map(async (subtopic) => {
            const subtopicQuizCount = await Quiz.countDocuments({
              subject: subject.id,
              subtopic: subtopic.id,
              isActive: true
            });

            return {
              ...subtopic.toObject(),
              quizzes: subtopicQuizCount
            };
          })
        );

        return {
          ...subject.toObject(),
          quizzes: quizCount,
          subtopics: subtopicsWithQuizCounts
        };
      })
    );

    res.json({
      success: true,
      subjects: subjectsWithQuizCounts
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subjects'
    });
  }
});

// Get subject by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const subject = await Subject.findOne({ id, isActive: true });
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Calculate quiz counts for subtopics
    const subtopicsWithQuizCounts = await Promise.all(
      subject.subtopics.map(async (subtopic) => {
        const quizCount = await Quiz.countDocuments({
          subject: subject.id,
          subtopic: subtopic.id,
          isActive: true
        });

        return {
          ...subtopic.toObject(),
          quizzes: quizCount
        };
      })
    );

    const totalQuizzes = await Quiz.countDocuments({ 
      subject: subject.id, 
      isActive: true 
    });

    res.json({
      success: true,
      subject: {
        ...subject.toObject(),
        quizzes: totalQuizzes,
        subtopics: subtopicsWithQuizCounts
      }
    });
  } catch (error) {
    console.error('Get subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subject'
    });
  }
});

// Get subject with user progress
router.get('/:id/progress', protect, async (req, res) => {
  try {
    const { id } = req.params;
    
    const subject = await Subject.findOne({ id, isActive: true });
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Get user progress for this subject
    const userProgress = await Progress.findOne({ user: req.user.id });
    const subjectProgress = userProgress?.subjects.find(s => s.subjectId === id);

    // Calculate quiz counts and merge with progress
    const subtopicsWithProgress = await Promise.all(
      subject.subtopics.map(async (subtopic) => {
        const quizCount = await Quiz.countDocuments({
          subject: subject.id,
          subtopic: subtopic.id,
          isActive: true
        });

        const subtopicProgress = subjectProgress?.subtopics.find(
          st => st.subtopicId === subtopic.id
        );

        return {
          ...subtopic.toObject(),
          quizzes: quizCount,
          progress: subtopicProgress ? Math.round((subtopicProgress.quizzesCompleted / quizCount) * 100) : 0,
          averageScore: subtopicProgress?.averageScore || 0,
          bestScore: subtopicProgress?.bestScore || 0,
          timeSpent: subtopicProgress?.timeSpent || 0,
          lastActivity: subtopicProgress?.lastActivity || null
        };
      })
    );

    const totalQuizzes = await Quiz.countDocuments({ 
      subject: subject.id, 
      isActive: true 
    });

    res.json({
      success: true,
      subject: {
        ...subject.toObject(),
        quizzes: totalQuizzes,
        subtopics: subtopicsWithProgress,
        overallProgress: subjectProgress?.overallProgress || 0,
        averageScore: subjectProgress?.averageScore || 0,
        totalTimeSpent: subjectProgress?.totalTimeSpent || 0,
        lastActivity: subjectProgress?.lastActivity || null
      }
    });
  } catch (error) {
    console.error('Get subject with progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subject progress'
    });
  }
});

// Get subtopic details
router.get('/:subjectId/:subtopicId', async (req, res) => {
  try {
    const { subjectId, subtopicId } = req.params;
    
    const subject = await Subject.findOne({ id: subjectId, isActive: true });
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    const subtopic = subject.subtopics.find(st => st.id === subtopicId);
    
    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: 'Subtopic not found'
      });
    }

    const quizCount = await Quiz.countDocuments({
      subject: subjectId,
      subtopic: subtopicId,
      isActive: true
    });

    res.json({
      success: true,
      subtopic: {
        ...subtopic.toObject(),
        quizzes: quizCount,
        subject: {
          id: subject.id,
          name: subject.name,
          color: subject.color,
          icon: subject.icon
        }
      }
    });
  } catch (error) {
    console.error('Get subtopic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subtopic'
    });
  }
});

module.exports = router;
