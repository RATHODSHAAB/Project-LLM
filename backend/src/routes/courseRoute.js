const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/',authMiddleware, instructorMiddleware, courseController.createCourse);
router.get('/',authMiddleware, instructorMiddleware, courseController.getAllCourses);
router.get('/:id', authMiddleware, instructorMiddleware, courseController.getCourseById);

module.exports = router;
