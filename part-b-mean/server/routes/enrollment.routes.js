const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const validate = require('../middleware/request.validator.middleware');
const { enrollInCourse, updateEnrollmentProgress, unenrollFromCourse } = require('../validators/enrollment.validator');

const router = express.Router();

// Get Enrollments for Current User (UNUSED)
router.get('/', requireAuth, enrollmentController.getEnrollmentsByUser);

// Get Enrollment by Course ID for Current User (UNUSED)
router.get('/:courseId', requireAuth, enrollmentController.getEnrollmentByCourseId);

// Enroll in a Course
// router.post('/enroll', validate(enrollInCourse), enrollmentController.enrollInCourse);
router.post('/enroll', requireAuth, validate(enrollInCourse), enrollmentController.enrollInCourse);

// Get Enrollment Progress by Course ID
router.get('/progress/:courseId', requireAuth, enrollmentController.getEnrollmentProgress);

// Update Enrollment Progress
router.put('/progress', requireAuth, validate(updateEnrollmentProgress), enrollmentController.updateEnrollmentProgress);

// Unenroll from a Course
router.delete('/enroll', requireAuth, validate(unenrollFromCourse), enrollmentController.unenrollFromCourse);

module.exports = router;