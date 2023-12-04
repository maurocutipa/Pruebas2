
const { check, body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')


const validateMain = [
    body('interviniente').exists().not().isEmpty(),
    body('victimaRelacion').exists().not().isEmpty(),
    body('idDenuncia').exists().not().isEmpty().isNumeric(),

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateMain