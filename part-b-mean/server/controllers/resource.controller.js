const Resource = require('../models/resource.model');

exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

exports.getResourceById = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(resource);
  } catch (error) {
    next(error);
  }
};

exports.getResourcesByTypeAndCategory = async (req, res, next) => {
  try {
    const { type, category } = req.query;
    const query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    const resources = await Resource.find(query);
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};


exports.createResource = async (req, res, next) => {
  try {
    const { title, content, type } = req.body;
    const newResource = await Resource.create({ title, content, type });
    res.status(201).json(newResource);
  } catch (error) {
    next(error);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const { title, content, type } = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      { title, content, type },
      { new: true }
    );

    if (!updatedResource) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    next(error);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const deletedResource = await Resource.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    next(error);
  }
};

