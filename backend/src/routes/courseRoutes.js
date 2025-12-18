const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { upload } = require('../middleware/multer');


const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware');

router.post('/',authMiddleware, instructorMiddleware, upload.single('thumbnail') , courseController.createCourse);
router.get('/',authMiddleware, instructorMiddleware, courseController.getAllCourses);
router.get('/:id', authMiddleware, instructorMiddleware, courseController.getCourseById);

module.exports = router;
