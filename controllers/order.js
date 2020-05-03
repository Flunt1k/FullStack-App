const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = function(request, response) {
    
}

module.exports.createOrder = async function(request, response) {
    try {
        const lastOrder = await Order
        .findOne({user: request.user.id})
        .sort({date: -1})

        const maxOrder = lastOrder ? lastOrder.order : 0
        const order = await new Order({
            list: request.body.list,
            user: request.user.id,
            order: maxOrder + 1
        }).save()
   
        response.status(201).json(order)
    } catch (error) {
        errorHandler(response, error)
    }   
}