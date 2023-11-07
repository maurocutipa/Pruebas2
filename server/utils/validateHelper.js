const { validationResult } = require("express-validator")
const httpErrorHandler = require('./httpErrorHandler')
const showError = require('./showError')

const validateHelper = (req,res,next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        showError(error)
        httpErrorHandler(res,400,"BAD REQUEST",false,error.errors)
    }
}


module.exports = validateHelper