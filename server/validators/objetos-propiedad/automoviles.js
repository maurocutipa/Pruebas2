const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateAutomoviles = [
    body("idDenunciaAutomovilesTipo").
        optional().isNumeric(),
    body("idDenunciaAutomovilesMarca").
        optional().isNumeric(),
    body("modelo").
        optional(),   
    body("dominio").
        optional(),
    body("anioFabricacion").
        optional(),
    body("numMotor").
        optional(),
    body("numChasis").
        optional(),
    body("puertas").
        optional(),
    body("titular").
        optional(),
    body("color").
        optional(),
    body("gnc").
        optional().isBoolean(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateAutomoviles