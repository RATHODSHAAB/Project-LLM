const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
 {
    // Course title (e.g., "Complete Backend Development")
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Short description about the course
    description: {
      type: String
    },

    // Thumbnail image URL (usually from Cloudinary)
    thumbnail: {
      type: String,
      required: true
    },

    // Category of the course (Backend, Frontend, DevOps, etc.)
    category: {
      type: String,
      required: true
    },

    // ID of the instructor who created this course
    // This usually comes from the User collection
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',   // assuming you have a User model
      required: true
    }
  },
  {
    // Adds createdAt and updatedAt automatically
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
