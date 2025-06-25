
const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  estimatedTime: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  prerequisites: [String],
  learningObjectives: [String],
  tags: [String]
}, { _id: false });

const subjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['STEM', 'Liberal Arts', 'Technical', 'Creative', 'Other']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  subtopics: [subtopicSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  metadata: {
    totalQuizzes: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalStudents: {
      type: Number,
      default: 0
    }
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String
  }
}, {
  timestamps: true
});

// Index for better performance
subjectSchema.index({ id: 1 });
subjectSchema.index({ category: 1, isActive: 1 });
subjectSchema.index({ 'subtopics.id': 1 });

module.exports = mongoose.model('Subject', subjectSchema);
