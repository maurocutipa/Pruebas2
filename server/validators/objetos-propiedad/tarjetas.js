const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateTarjetas = [
    body("tipo").
        optional().isIn(['Debito','Credito']),   
    body("banco").
        optional(),
    body("numero").
        optional(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateTarjetas