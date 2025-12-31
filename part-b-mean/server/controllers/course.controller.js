const Course = require('../models/course.model');

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get Course by Difficulty and Category
exports.getCoursesByDifficultyAndCategory = async (req, res) => {
  try {
    const { difficulty, category } = req.query;
    const query = {};
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const newCourse = await Course.create({ title, description, instructor });
    res.status(201).json(newCourse);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

// Update Course
exports.updateCourse = async (req, res) => {
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
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    } 
    res.status(200).json(course);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};