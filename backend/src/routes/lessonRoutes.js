const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware');


router.use(authMiddleware);
router.use(instructorMiddleware);

router.post('/:courseId', lessonController.addLesson);
router.get('/:courseId', lessonController.getLessonsByCourse);


router.get('/lessons/:lessonId', lessonController.getLessonById);

// Update a lesson (only instructor of the course)
router.put('/lessons/:lessonId', lessonController.updateLesson);

// Delete a lesson (only instructor of the course)
router.delete('/lessons/:lessonId', lessonController.deleteLesson);

module.exports = router;