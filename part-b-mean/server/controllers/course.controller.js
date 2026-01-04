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
      return res.status(404).json({ message: 'Course not found' });
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
      return res.status(404).json({ message: 'Course details not found' });
    }

    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
};

// Get Course by Difficulty and Category
exports.getCoursesByDifficultyAndCategory = async (req, res, next) => {
  try {
    const { category: categories, difficulty: difficulties } = req.body;
    const query = {};

    if (!Array.isArray(categories) && !Array.isArray(difficulties)) {
      return res.status(400).json({ message: 'Invalid filters payload' });
    }

    if (categories.length > 0) {
      query.category = { 
        $in: categories.map(Number),
      };
    }

    if (difficulties.length > 0) {
      query.difficulty = { 
        $in: difficulties.map(Number),
      };
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}

// Create Course
exports.createCourse = async (req, res, next) => {
  try {
    const { slug, title, description, difficulty, category } = req.body;
    const newCourse = await Course.create({ slug, title, description, difficulty, category });
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
      return res.status(404).json({ message: 'Course not found' });
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
      return res.status(404).json({ message: 'Course not found' });
    } 
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};