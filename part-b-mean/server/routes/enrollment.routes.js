const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Get Enrollments for Current User (UNUSED)
router.get('/', requireAuth, enrollmentController.getEnrollmentsByUser);

// Get Enrollment by Course ID for Current User (UNUSED)
router.get('/:courseId', requireAuth, enrollmentController.getEnrollmentByCourseId);

// Enroll in a Course
// router.post('/enroll', requireAuth, enrollmentController.enrollInCourse);
router.post('/enroll', enrollmentController.enrollInCourse);

// Get Enrollment Progress by Course ID
router.get('/progress/:courseId', requireAuth, enrollmentController.getEnrollmentProgress);

// Update Enrollment Progress
router.put('/progress', requireAuth, enrollmentController.updateEnrollmentProgress);

// Unenroll from a Course
router.delete('/enroll', requireAuth, enrollmentController.unenrollFromCourse);

module.exports = router;