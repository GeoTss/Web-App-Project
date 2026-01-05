const Enrollment = require('../models/enrollment.model');
const CourseDetails = require('../models/course.details.model');

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
    res.status(200).json({ enrollment: enrollment });
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
      return res.status(201).json({ message: 'User is already enrolled in this course' });
    }

    const newEnrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    const courseDetails = await CourseDetails.findOne({ course: courseId });
    if (courseDetails && courseDetails.sections) {
      const topicsArray = [];
      courseDetails.sections.forEach(section => {
        section.topics.forEach(topic => {
          topicsArray.push({
            topicId: topic._id,
            checked: false,
          });
        });
      });
      newEnrollment.topics = topicsArray;
      await newEnrollment.save();
    }

    res.status(201).json(newEnrollment);
  } catch (error) {
    next(error);
  }
};

exports.getEnrollmentProgress = async (req, res, next) => {
  try {

    const userId = req.session.user._id;
    const courseId = req.params.courseId;

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    let countChecked = 0;
    for (const topic of enrollment.topics) {
      if (topic.checked) {
        countChecked++;
      }
    }
    const percentageCompleted = ((countChecked / enrollment.topics.length) * 100).toFixed(1);

    res.status(200).json({ percentageCompleted: percentageCompleted });
  } catch (error) {
    next(error);
  }
};

exports.updateEnrollmentProgress = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { courseId, topicId, check } = req.body;
    console.log(courseId);
    console.log(topicId);

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    const topic = enrollment.topics.find(t => t.topicId.toString() === topicId);
    if (topic) {
      topic.checked = check;
    } else {
      return res.status(404).json({ message: 'Topic not found in enrollment' });
    }

    if (enrollment.topics.every(t => t.checked)) {
      enrollment.status = 1;
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