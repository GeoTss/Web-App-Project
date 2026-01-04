const Enrollment = require('../models/enrollment.model');

exports.getEnrollmentsByUser = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const enrollments = await Enrollment.find({ user: userId }).populate('course');
    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: 'No enrollments found for this user' });
    }
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

exports.getEnrollmentByCourseId = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const courseId = req.params.courseId;

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId }).populate('course');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found for this course' });
    }
    res.status(200).json(enrollment);
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
      return res.status(400).json({ message: 'User is already enrolled in this course' });
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
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.progress = progress;

    if (enrollment.progress >= 100) {
      enrollment.status = 1; // COMPLETED ENUM_STATE
    }

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
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({ message: 'Unenrolled successfully' });
  } catch (error) {
    next(error);
  }
};