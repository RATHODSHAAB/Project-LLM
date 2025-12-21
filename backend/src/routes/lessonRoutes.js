const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware');
const { videoUpload } = require('../middleware/multer');


router.use(authMiddleware);
router.use(instructorMiddleware);

router.post("/lessons/:courseId",authMiddleware,
  instructorMiddleware, videoUpload.single("video"), lessonController.addLesson);


router.get('/:courseId', lessonController.getLessonsByCourse);


router.get('/lessons/:lessonId', lessonController.getLessonById);


module.exports = router;