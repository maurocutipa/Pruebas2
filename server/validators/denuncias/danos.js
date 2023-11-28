const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateDanos = [
    
    body("danoAnimal").
        optional().isBoolean(),
    body("danoCosaMaterial").
        optional().isBoolean(),
    body("danoInmueble").
        optional().isBoolean(),
    body("danoSistemaInformatico").
        optional().isBoolean(),
    body("consecuenciaDano").
        optional().isBoolean(),
    body("consecuenciaDestruccion").
        optional().isBoolean(),
    body("consecuenciaInutilizacion").
        optional().isBoolean(),
    body("consecuenciaDesaparicion").
        optional().isBoolean(),
    body("consecuenciaOtro").
        optional().isBoolean(),
    body("consecuenciaDetallesOtro").
        optional(),
    body("pertenencia").
        optional(),

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateUpdateDanos