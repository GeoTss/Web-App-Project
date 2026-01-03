const Course = require('../models/course.model');
const CourseDetails = require('../models/course.details.model');

// Get All Courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}

// Get Course by ID
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
        const error = new Error('Course not found');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
}

exports.getCourseDetailsByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const details = await CourseDetails
      .findOne({ course: courseId })
      .populate('course');

    if (!details) {
      const error = new Error('Course details not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
};

// Get Course by Difficulty and Category
exports.getCoursesByDifficultyAndCategory = async (req, res, next) => {
  try {
    const { categories, difficulties } = req.body;
    const query = {};

    if (Array.isArray(categories) && categories.length > 0) {
      query.category = { $in: categories };
    }

    if (Array.isArray(difficulties) && difficulties.length > 0) {
      query.difficulty = { $in: difficulties };
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

// Create Course
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, instructor } = req.body;
    const newCourse = await Course.create({ title, description, instructor });
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
}

// Update Course
exports.updateCourse = async (req, res, next) => {
  try {
    const { title, description, instructor } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, instructor },
      { new: true }
    );
    if (!course) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
}

// Delete Course
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      throw error;
    } 
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};