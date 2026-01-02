const express = require('express');
const courseController = require('../controllers/course.controller');
const requireAdmin  = require('../middleware/auth.middleware');

const router = express.Router();

// Get All Courses
router.get('/', courseController.getAllCourses);

// Get Course by ID
router.get('/:id', courseController.getCourseById);

// Get Courses by Difficulty and Category
router.post('/search', courseController.getCoursesByDifficultyAndCategory);

// Create Course
router.post('/', requireAdmin, courseController.createCourse);

// Update Course
router.put('/:id', requireAdmin, courseController.updateCourse);

// Delete Course
router.delete('/:id', requireAdmin, courseController.deleteCourse);

module.exports = router;