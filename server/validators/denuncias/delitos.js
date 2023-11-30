const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateDelitoPersona = [
    body("femicidio").optional().isBoolean(),
    body("lesiones").optional().isBoolean(),
    body("homicidio").optional().isBoolean(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateUpdateDelitoSexual = [
    // hecho
    body("hechoAcercamiento").optional().isBoolean(),
    body("hechoContactoTecnologico").optional().isBoolean(),
    body("hechoBeso").optional().isBoolean(),
    body("hechoTocamiento").optional().isBoolean(),
    body("hechoIntroduccion").optional().isBoolean(),
    // accion
    body("accionViolencia").optional().isBoolean(),
    body("accionDrogas").optional().isBoolean(),
    body("accionVulnerabilidad").optional().isBoolean(),
    body("accionArma").optional().isBoolean(),
    // adicional
    body("denunciasPrevias").optional().isBoolean(),
    body("solicitudImagenes").optional().isBoolean(),
    body("mediosElectronicos").optional().isBoolean(),
    body("menorInvolucrado").optional().isBoolean(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  {validateUpdateDelitoPersona, validateUpdateDelitoSexual}