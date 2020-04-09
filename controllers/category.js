const Category = require("../models/Category");
const Position = require("../models/Position")
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function(request, response) {
  try {
    const categories = await Category.find({ user: request.user.id });
    response.status(200).json(categories);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.getByID = async function(request, response) {
  try {
      const category = await Category.findById(request.params.id)
      response.status(200).json(category)
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.deleteByID = async function(request, response) {
  try {
      await Category.remove({_id: request.params.id})
      await Position.remove({category: request.params.id})
      response.status(200).json({
          message: "Category is deleted"
      })
  } catch (error) {
    errorHandler(response,error);
  }
};

module.exports.createCategory = async function(request, response) {
  try {
      const category = new Category({
          name: request.body.name,
          user: request.user.id,
          imgSrc: request.file ? request.file.path : ''
      })
      await category.save()
      response.status(201).json(category)
  } catch (error) {
    errorHandler(response, error);
  }
};

module.exports.updateCategory = async function(request, response) {
  try {
  } catch (error) {
    errorHandler(response, error);
  }
};
