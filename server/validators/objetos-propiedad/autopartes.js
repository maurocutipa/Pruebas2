const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateAutopartes = [
    body("tipo").
        optional(),
    body("marca").
        optional(),   
    body("modelo").
        optional(),
    body("dominio").
        optional(),
    body("sustraido").
        optional().isBoolean(),
    body("danada").
        optional().isBoolean(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateAutopartes