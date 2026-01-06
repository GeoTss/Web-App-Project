const { body } = require('express-validator');
const { ENROLLMENT_STATES } = require('../models/constants');

exports.enrollInCourse = [
  body('courseId').isString().withMessage('Course ID must be a string')
];

exports.updateEnrollmentProgress = [
  body('courseId').isString().withMessage('Course ID must be a string')
];