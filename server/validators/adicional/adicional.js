const { body, check } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateGetBarrios = [
    check("id").
        optional().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

//

const validateGetlocalidad = [
    check("id").
        optional().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  {validateGetBarrios,validateGetlocalidad}