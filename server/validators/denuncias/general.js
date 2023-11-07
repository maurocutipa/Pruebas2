const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateGeneral = [
    body("descripcionQue").
        exists().not().isEmpty(),
    body("descripcionComo").
        exists().not().isEmpty(),
    body("certezaFecha").
        exists().not().isEmpty().isNumeric({min:0,max:1}),
    body("fechaHecho").
        if(body("certezaFecha").equals("1")).
            exists().not().isEmpty(),
    body("horaHecho").
        if(body("certezaFecha").equals("1")).
            exists().not().isEmpty(),
    body("detalleFecha").
        if(body("certezaFecha").equals("0")).
            exists().not().isEmpty(),
    body("certezaLugar").
        exists().not().isEmpty().isNumeric({min:0,max:1}),
    body("idLocalidad").
        exists().not().isEmpty().isNumeric(),
    body("idBarrio").
        if(body("certezaLugar").equals("1")).
            exists().not().isEmpty().isNumeric(),
    body("pisoHecho").
        if(body("certezaLugar").equals("1")).
            exists().not().isEmpty().isNumeric(),
    body("departamentoHecho").
        if(body("certezaLugar").equals("1")).
            exists().not().isEmpty().isNumeric(),
    body("calleHecho").
        if(body("certezaLugar").equals("1")).
            optional(),
    body("numCalle").
        if(body("certezaLugar").equals("1")).
            optional(),
    body("latitudHecho").
        if(body("certezaLugar").equals("1")).
            exists().not().isEmpty(),
    body("longitudHecho").
        if(body("certezaLugar").equals("1")).
            exists().not().isEmpty(),
    /* body("detalleLugar").
        if(body("certezaLugar").equals("0")).
            exists().not().isEmpty(),   */  
    body("informacionAdicional").optional(),
    body("anonimo").
        optional().isNumeric({min:0,max:1}),
    body("datosDenunciado").
        optional().isNumeric({min:0,max:1}),
    body("testigo").
        optional().isNumeric({min:0,max:1}),
    body("datosTestigo").
        optional().isNumeric({min:0,max:1}),
    body("idTipoDenuncia").
        exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateCreateGeneral