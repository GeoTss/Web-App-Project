const Enrollment = require('../models/enrollment.model');

exports.getEnrollmentsByUser = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const enrollments = await Enrollment.find({ user: userId }).populate('course');
    if (!enrollments) {
      return res.status(404).json({ message: 'No enrollments found' });
    }
    res.status(200).json(enrollments);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { courseId } = req.body;

    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const newEnrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json(newEnrollment);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEnrollmentProgress = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { courseId, progress } = req.body;

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.progress = progress;
    await enrollment.save();

    res.status(200).json(enrollment);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.unenrollFromCourse = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { courseId } = req.body;

    const enrollment = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    res.status(200).json({ message: 'Unenrolled successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};