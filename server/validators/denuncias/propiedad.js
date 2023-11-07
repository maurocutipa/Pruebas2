const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreatePropiedad = [
    body("idDenuncia").
        exists().not().isEmpty(),
    body("danoCosas").
        optional().isNumeric({min:0,max:1}),
    body("armas").
        optional().isNumeric({min:0,max:1}),
    body("violenciaFisica").
        optional().isNumeric({min:0,max:1}),
    body("amenaza").
        optional().isNumeric({min:0,max:1}),
    body("arrebato").
        optional().isNumeric({min:0,max:1}),
    body("otra").
        optional().isNumeric({min:0,max:1}),
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