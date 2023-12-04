const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdatePropiedad = [
    check("id").exists().not().isEmpty().isNumeric(),

    body("danoCosas").
        optional().isBoolean(),
    body("armas").
        optional().isBoolean(),
    body("violenciaFisica").
        optional().isBoolean(),
    body("amenaza").
        optional().isBoolean(),
    body("arrebato").
        optional().isBoolean(),
    body("otra").
        optional().isBoolean(),
    body("cantTelefonos").
        optional().isNumeric(),
    body("cantAutomoviles").
        optional().isNumeric(),
    body("cantBicicletas").
        optional().isNumeric(),
    body("cantAutopartes").
        optional().isNumeric(),
    body("cantDocumentacion").
        optional().isNumeric(),
    body("cantTarjetas").
        optional().isNumeric(),
    body("cantCheques").
        optional().isNumeric(),
    body("cantOtros").
        optional().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateUpdatePropiedad