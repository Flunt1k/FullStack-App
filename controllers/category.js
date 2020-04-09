const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(request, response) {
    try {
      const categories = await Category.find({user: request.user.id})
      response.status(200).json(categories)          
    } catch (error) {
      errorHandler(error)  
    }
}

module.exports.getByID = async function(request, response) {
    try {
        
    } catch (error) {
      errorHandler(error)  
    }
}

module.exports.deleteByID = async function(request, response) {
    try {
        
    } catch (error) {
      errorHandler(error)  
    }
}

module.exports.createCategory = async function(request, response) {
    try {
        
    } catch (error) {
      errorHandler(error)  
    }
}

module.exports.updateCategory = async function(request, response) {
    try {
        
    } catch (error) {
      errorHandler(error)  
    }
}