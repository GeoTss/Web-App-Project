const Enrollment = require('../models/enrollment.model');

module.exports = async function requireEnrollment(req, res, next) {
  try {
    const userId = req.session.user.id;
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (!enrollment) {
        const err = new Error('Enrollment required to access this resource');
        err.statusCode = 403;
        return next(err);
    }

    next();
  } catch (error) {  
    next(error);
  }
};