const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateGeneral = [
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
        optional().isNumeric(),
    body("departamentoHecho").
        optional().isNumeric(),
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
    body("anonimo").
        optional().isBoolean(),
    body("datosDenunciado").
        optional().isBoolean(),
    body("testigo").
        optional().isBoolean(),
    body("datosTestigo").
        optional().isBoolean(),
    body("competencia").
        optional(),
    body("idTipoDenuncia").
        optional().isNumeric(),
    
    //nuevos campos 
    body("idSeccional").
        optional().isNumeric(),
    body("idUsuario").
        optional().isNumeric(),
    body("funcionGrado").
        optional(),
    body("flagrancia").
        optional().isBoolean(),
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