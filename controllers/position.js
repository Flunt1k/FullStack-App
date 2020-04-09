const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')



module.exports.getByCategoryId = async function(request, response) {
    try {
        const positions = await Position.find({
            category: request.params.categoryId,
            user: request.user.id
        })
        response.status(200).json(positions)
    } catch (error) {
        errorHandler(response, error)
    }
}

module.exports.createPosition = async function(request, response) {
    try {
        const position = new Position({
            name: request.body.name,
            cost: request.body.cost,
            category: request.body.category,
            name: request.user.id
        })
        await position.save()
        response.status(201).json(position)
    } catch (error) {
        errorHandler(response, error)
    }
}

module.exports.deleteByID = async function(request, response) {
    try {
        
    } catch (error) {
        errorHandler(response, error)
    }
}

module.exports.updateByID = async function(request, response) {
    try {
        
    } catch (error) {
        errorHandler(response, error)
    }
}