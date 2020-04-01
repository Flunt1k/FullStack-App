const bcrypt = require("bcryptjs");
const webToken = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require("../models/User");
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(request, response) {
  const currentUser = await User.findOne({ email: request.body.email });

  if (currentUser) {
    const passwordCheckResult = bcrypt.compareSync(request.body.password,currentUser.password);
    if (passwordCheckResult) {
        const token = webToken.sign({
            email: currentUser.email,
            userId: currentUser._id
        }, keys.webToken, {expiresIn: 60 * 60})

        response.status(200).json({
            token: `Bearer ${token}`
        })
    } else {
      response.status(401).json({
        message: "Password is incorrect"
      });
    }
  } else {
    response.status(404).json({
      message: `User isn't found with ${request.body.email} email`
    });
  }
};

module.exports.register = async function(request, response) {
  const newUser = await User.findOne({ email: request.body.email });
  if (newUser) {
    response.status(409).json({
      message: "User already exists. Change your email or reset password"
    });
  } else {
    //Generate new hash code for password
    const salt = bcrypt.genSaltSync(10);
    const password = request.body.password;
    const user = new User({
      email: request.body.email,
      password: bcrypt.hashSync(password, salt)
    });
    try {
      await user.save();
      response.status(201).json(user);
    } catch (error) {
      errorHandler(response, error)
    }
  }
};
