const { check, body } = require("express-validator")
const validateHelper = require('../utils/validateHelper')

const validateCreateInterviniente = [
    body("nombre").
        exists().not().isEmpty(),
    body("apellido").
        exists().not().isEmpty(),
    body("tipoIdentificacion").
        exists().not().isEmpty(),
    body("numeroIdentificacion").
        exists().not().isEmpty(),
    body("alias").
        optional(),
    body("identidadAutopercibida").
        optional(),
    body("fechaNacimiento").
        exists().not().isEmpty(),
    body("idPais").
        exists().not().isEmpty().isNumeric(),
    body("domicilio").
        exists().not().isEmpty(),
    body("idProvincia").
        exists().not().isEmpty().isNumeric(),
    body("idBarrio").
        exists().not().isEmpty().isNumeric(),
    body("idLocalidad").
        exists().not().isEmpty().isNumeric(),
    body("telefonoFijo").
        exists().not().isEmpty(),
    body("telefonoMovil").
        exists().not().isEmpty(),
    body("email").
        exists().not().isEmpty(),
    body("tipoPersona").
        exists().not().isEmpty().isIn(['Fisica','Juridica']),
    body("idIntervinienteTipo").
        exists().not().isEmpty().isNumeric(),
    body("informacionAdicional").
        optional(),
    body("concurso").
        optional(),
    body("autoriaParticipacion").
        optional(),
    body("grado").
        optional(),
    //estado_preso y matricula profesional            
    
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateCreateIntervinienteDenuncia = [

    body("idDenuncia").
        exists().not().isEmpty().isNumeric(),
    body("idInterviniente").
        exists().not().isEmpty().isNumeric(),        

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateUpload = [
    check("id").exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateCreateIntervinienteVitima = [
    body("idDenuncia").exists().not().isEmpty().isNumeric(),
    body("idInterviniente").exists().not().isEmpty().isNumeric(),
    body("conocimientoVictima").optional(),
    body("vinculoVictima").
        exists().
        not().isEmpty().
        isIn(['Padre','Madre','Hijo/a','Hermano/a','Pareja','ExPareja','Familiar','Compañero','Otro']),
    body("detalleVinculo").if(body("vinculoVictima").equals("Otro")).not().isEmpty().optional(),
    body("dependeIngresos").optional().isNumeric({min:0, max:1}),
    body("hijosMenores").optional().isNumeric({min:0, max:1}),
    body("riesgoVida").optional().isNumeric({min:0, max:1}),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = {
    validateCreateInterviniente,
    validateCreateIntervinienteDenuncia,
    validateCreateIntervinienteVitima,
    validateUpload
}