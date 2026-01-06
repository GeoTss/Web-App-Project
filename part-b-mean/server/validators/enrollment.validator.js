const { body } = require('express-validator');
const { ENROLLMENT_STATES } = require('../models/constants');

exports.enrollInCourse = [
  body('courseId').isString().withMessage('Course ID must be a string')
];

exports.updateEnrollmentProgress = [
  body('courseId').isString().withMessage('Course ID must be a string'),
  body('topicId').isString().withMessage('Topic ID must be a string'),
  body('checked').isBoolean().withMessage('Checked must be a boolean')
];

exports.unenrollFromCourse = [
  body('courseId').isString().withMessage('Course ID must be a string')
];

