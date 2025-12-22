const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    // Course title
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Description
    description: {
      type: String
    },

    // Thumbnail
    thumbnail: {
      type: String,
      required: true
    },

    // Category
    category: {
      type: String,
      required: true
    },

    // Instructor
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // ✅ Lessons array (this must be inside the schema definition)
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
      }
    ]
  },
  {
    // Options
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
