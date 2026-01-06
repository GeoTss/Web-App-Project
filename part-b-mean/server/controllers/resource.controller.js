const resource = require('../models/resource.model');
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
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    next(error);
  }
};

exports.getResourcesByTypeAndCategory = async (req, res, next) => {
  try {
    const { type, category } = req.body;
    const query = {};
    if (category.length > 0) {
      query.category = {
        $in: category,
      };
    }

    if (type.length > 0) {
      query.type = {
        $in: type,
      };
    }
    const resources = await Resource.find(query);
    res.status(200).json({ resources: resources });
  } catch (error) {
    next(error);
  }
};


exports.createResource = async (req, res, next) => {
  try {
    const { type, title, author, url, coverImage, videoId, category } = req.body;
    if (!type || !title || !category) {
      return res.status(400).json({ message: 'Type, Title, and Category are required' });
    }
    let resourceData = {type, title, category};
    if (author)
      resourceData.author = author;
    if (url)
      resourceData.url = url;
    if (coverImage)
      resourceData.coverImage = coverImage;
    if (videoId)
      resourceData.videoId = videoId;
    const newResource = await Resource.create(resourceData);
    res.status(201).json(newResource);
  } catch (error) {
    next(error);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const resourceId = req.params.id;

    const { type, title, author, url, coverImage, videoId, category } = req.body;

    if (!type || !title || !category) {
      return res.status(400).json({ message: 'Type, Title, and Category are required' });
    }

    let resourceData = {type, title, category};
    if (author)
      resourceData.author = author;
    if (url)
      resourceData.url = url;
    if (coverImage)
      resourceData.coverImage = coverImage;
    if (videoId)
      resourceData.videoId = videoId;

    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      resourceData,
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
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
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    next(error);
  }
};

