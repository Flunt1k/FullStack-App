const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.login = function(request, response) {
    response.status(200).json({
        login: {
            email: request.body.email,
            password: request.body.password
        }
    })
}

module.exports.register = async function(request, response) {
    const newUser = await User.findOne({email: request.body.email})
    if(newUser){
        response.status(409).json({
            message: 'User is already exist. Change your email or reset password'
        })
    } else {
        //Generate new hash code for password
        const salt = bcrypt.genSaltSync(10)
        const password = request.body.password
        const user = new User({
            email: request.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            response.status(201).json(user)
        } catch (error) {
            
        }
    }
}