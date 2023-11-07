const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateDanos = [
    body("idDenuncia").exists().not().isEmpty(),
    body("danoAnimal").
        optional().isNumeric({min: 0, max: 1}),
    body("danoCosaMaterial").
        optional().isNumeric({min: 0, max: 1}),
    body("danoInmueble").
        optional().isNumeric({min: 0, max: 1}),
    body("danoSistemaInformatico").
        optional().isNumeric({min: 0, max: 1}),
    body("consecuenciaDano").
        optional().isNumeric({min:0,max:1}),
    body("consecuenciaDestruccion").
        optional().isNumeric({min:0,max:1}),
    body("consecuenciaInutilizacion").
        optional().isNumeric({min:0,max:1}),
    body("consecuenciaDesaparicion").
        optional().isNumeric({min:0,max:1}),
    body("consecuenciaOtro").
        optional().isNumeric({min:0,max:1}),
    body("consecuenciaDetallesOtro").
        if(body("consecuenciaOtro").exists().equals("1")).
            exists().notEmpty(),
    body("pertenencia")
        .exists().not().isEmpty(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateCreateDanos