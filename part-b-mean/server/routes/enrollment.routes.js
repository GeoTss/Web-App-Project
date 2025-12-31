const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');
const requireAuth = require('../middleware/auth.middleware');

const router = express.Router();

// Get Enrollments for Current User
router.get('/', requireAuth, enrollmentController.getEnrollmentsByUser);

// Enroll in a Course
router.post('/enroll', requireAuth, enrollmentController.enrollInCourse);

// Update Enrollment Progress
router.put('/progress', requireAuth, enrollmentController.updateEnrollmentProgress);

// Unenroll from a Course
router.delete('/unenroll', requireAuth, enrollmentController.unenrollFromCourse);

module.exports = router;