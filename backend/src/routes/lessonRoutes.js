const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware');
const { videoUpload } = require('../middleware/multer');



router.post("/:courseId",authMiddleware,
  instructorMiddleware, videoUpload.single("video"), lessonController.addLesson);


router.get('/course/:courseId', lessonController.getLessonsByCourse);


router.get('/:lessonId', lessonController.getLessonById);


module.exports = router;

//http://localhost:5000/api/lessons/${courseId}