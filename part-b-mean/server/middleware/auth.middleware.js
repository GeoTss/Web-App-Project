exports.requireAuth = (req, res, next) => {
  if (!req.session.user) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;
    return next(err);
  }
  next();
};

// HYPER VULN FUNCTION MOMENT
exports.requireAdmin = (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    const err = new Error('Forbidden');
    err.statusCode = 403;
    return next(err);
  }
  next();
}

