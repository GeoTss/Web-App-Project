const Enrollment = require('../models/enrollment.model');

exports.getEnrollmentsByUser = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const enrollments = await Enrollment.find({ user: userId }).populate('course');
    if (!enrollments) {
      const error = new Error('No enrollments found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

exports.enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { courseId } = req.body;

    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      const error = new Error('Already enrolled in this course');
      error.statusCode = 400;
      throw error;
    }

    const newEnrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json(newEnrollment);
  } catch (error) {
    next(error);  
  }
};

exports.updateEnrollmentProgress = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { courseId, progress } = req.body;

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      const error = new Error('Enrollment not found');
      error.statusCode = 404;
      throw error;
    }

    enrollment.progress = progress;
    await enrollment.save();

    res.status(200).json(enrollment);
  } catch (error) {
    next(error);
  }
};

exports.unenrollFromCourse = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { courseId } = req.body;

    const enrollment = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
    if (!enrollment) {
      const error = new Error('Enrollment not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({ message: 'Unenrolled successfully' });
  } catch (error) {
    next(error);
  }
};