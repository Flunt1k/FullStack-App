module.exports.login = function(request, response) {
    response.status(200).json({
        login: {
            email: request.body.email,
            password: request.body.password
        }
    })
}

module.exports.register = function(request, response) {
    response.status(200).json({
        register: 'passed'
    })
}