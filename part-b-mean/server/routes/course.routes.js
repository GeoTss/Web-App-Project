const express = require('express');
const courseController = require('../controllers/course.controller');
// const requireEnrollment = require('../middleware/require.enrollment.middleware');
const validate = require('../middleware/request.validator.middleware');
const { requireAdmin, requireAuth } = require('../middleware/auth.middleware');
const { getCoursesByDifficultyAndCategory } = require('../validators/course.validator');

const router = express.Router();

// USERS ROUTES

// Get All Courses (UNUSED)
router.get('/', courseController.getAllCourses);

// Get Course by ID (UNUSED)
router.get('/:id', courseController.getCourseById);

// Get Course Details by Course ID
// router.get('/:id/details', requireAuth, courseController.getCourseDetailsByCourseId);
router.get('/:id/details', courseController.getCourseDetailsByCourseId);

// Get Courses by Difficulty and Category
router.post('/search', validate(getCoursesByDifficultyAndCategory), courseController.getCoursesByDifficultyAndCategory);


// ADMIN ROUTES

// Create Course
router.post('/', requireAdmin, courseController.createCourse);

// Update Course
router.put('/:id', requireAdmin, courseController.updateCourse);

// Delete Course
router.delete('/:id', requireAdmin, courseController.deleteCourse);

module.exports = router;