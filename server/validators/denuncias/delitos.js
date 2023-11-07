const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateDelitoPersona = [
    body("idDenuncia").exists().not().isEmpty(),
    body("femicidio").optional().isNumeric({min:0, max:1}),
    body("lesiones").optional().isNumeric({min:0, max:1}),
    body("homicidio").optional().isNumeric({min:0, max:1}),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateCreateDelitoSexual = [
    body("idDenuncia").exists().not().isEmpty(),
    // hecho
    body("hechoAcercamiento").optional().isNumeric({min:0,max:1}),
    body("hechoContactoTecnologico").optional().isNumeric({min:0,max:1}),
    body("hechoBeso").optional().isNumeric({min:0,max:1}),
    body("hechoTocamiento").optional().isNumeric({min:0,max:1}),
    body("hechoIntroduccion").optional().isNumeric({min:0,max:1}),
    // accion
    body("accionViolencia").optional().isNumeric({min:0,max:1}),
    body("accionDrogas").optional().isNumeric({min:0,max:1}),
    body("accionVulnerabilidad").optional().isNumeric({min:0,max:1}),
    body("accionArma").optional().isNumeric({min:0,max:1}),
    // adicional
    body("denunciasPrevias").exists().not().isEmpty().isNumeric({min:0, max:1}),
    body("solicitudImagenes").exists().not().isEmpty().isNumeric({min:0, max:1}),
    body("mediosElectronicos").exists().not().isEmpty().isNumeric({min:0, max:1}),
    body("menorInvolucrado").exists().not().isEmpty().isNumeric({min:0, max:1}),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  {validateCreateDelitoPersona, validateCreateDelitoSexual}