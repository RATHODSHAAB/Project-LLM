const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
    {
      // Title of the lesson (e.g., "Introduction to Node.js")
      title: {
        type: String,
        required: true,
        trim: true
      },
  
      // Detailed explanation / text content of the lesson
      description: {
        type: String,
        required: true
      },
  
      // Video URL returned from Cloudinary after upload
      // This is NOT the video file itself, just the link
      videoURL: {
        type: String,
        required: true
      },
  
      // 🔗 RELATIONSHIP FIELD
      // This stores the _id of the Course document
      // It tells MongoDB: "This lesson belongs to this course"
      courseId: {
        type: mongoose.Schema.Types.ObjectId, // must match Course _id type
        ref: 'Course',                        // tells Mongoose which model it refers to
        required: true
      }
    },
    {
      // Automatically adds createdAt and updatedAt timestamps
      timestamps: true
    }
);

module.exports = mongoose.model('Lesson', lessonSchema);
