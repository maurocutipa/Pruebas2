const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateOtro = [
    body("tipo").
        optional(),   
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateOtro