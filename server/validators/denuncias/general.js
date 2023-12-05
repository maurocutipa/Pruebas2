const { check, body, param } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateGeneral = [
    check("id").exists().not().isEmpty().isNumeric(),             
    
    body("competencia").
        optional(),
    body("flagrancia").
        optional().isBoolean(),
    body("descripcionQue").
        optional(),
    body("descripcionComo").
        optional(),  
    body("certezaFecha").
        optional().isBoolean(),
    body("fechaHecho").
        optional(),
    body("horaHecho").
        optional(),
    body("detalleFecha").
        optional(),
    body("certezaLugar").
        optional(),
    body("idLocalidad").
        optional(),
    body("idBarrio").
        optional(),
    body("pisoHecho").
        optional(),
    body("departamentoHecho").
        optional(),
    body("calleHecho").
        optional(),
    body("numCalle").
        optional(),
    body("latitudHecho").
        optional(),
    body("longitudHecho").
        optional(),
    body("detalleLugar").
        optional(),
    body("informacionAdicional").
        optional(),
    body("datosDenunciado").
        optional().isBoolean(),
    body("testigo").
        optional().isBoolean(),
    body("datosTestigo").
        optional().isBoolean(),
    body("idUsuario").
        optional().isNumeric(),
    body("funcionGrado").
        optional(),
    body("firmaDenunciante").
        optional().isBoolean(),
    body("firmaAutoridad").
        optional().isBoolean(),
    body("realizacion").
        optional(),
    body("idUserRatificacion").
        optional().isNumeric(),

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateUpdateGeneral