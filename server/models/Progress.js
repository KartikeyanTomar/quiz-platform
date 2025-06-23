
const mongoose = require('mongoose');

const subtopicProgressSchema = new mongoose.Schema({
  subtopicId: {
    type: String,
    required: true
  },
  quizzesCompleted: {
    type: Number,
    default: 0
  },
  totalQuizzes: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  bestScore: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: null
  }
}, { _id: false });

const subjectProgressSchema = new mongoose.Schema({
  subjectId: {
    type: String,
    required: true
  },
  subtopics: [subtopicProgressSchema],
  overallProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  totalQuizzesCompleted: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: null
  }
}, { _id: false });

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  subjects: [subjectProgressSchema],
  globalStats: {
    totalQuizzesCompleted: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    favoriteSubject: {
      type: String,
      default: null
    },
    studyStreak: {
      current: {
        type: Number,
        default: 0
      },
      longest: {
        type: Number,
        default: 0
      },
      lastStudyDate: {
        type: Date,
        default: null
      }
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
progressSchema.index({ user: 1 });
progressSchema.index({ 'subjects.subjectId': 1 });

module.exports = mongoose.model('Progress', progressSchema);
