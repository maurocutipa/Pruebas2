const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreatePropiedad = [
    body("idDenuncia").
        exists().not().isEmpty(),
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
        optional(),
    body("cantAutomoviles").
        optional(),
    body("cantBicicletas").
        optional(),
    body("cantAutopartes").
        optional(),
    body("cantDocumentacion").
        optional(),
    body("cantTarjetas").
        optional(),
    body("cantCheques").
        optional(),
    body("cantOtros").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateCreatePropiedad