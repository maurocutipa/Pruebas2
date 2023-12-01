const { check, body } = require("express-validator")
const validateHelper = require('../utils/validateHelper')

const validateUpdateInterviniente = [
    body("nombre").
        optional(),
    body("apellido").
        optional(),
    body("tipoIdentificacion").
        optional(),
    body("numeroIdentificacion").
        optional(),
    body("alias").
        optional(),
    body("identidadAutopercibida").
        optional(),
    body("fechaNacimiento").
        optional(),
    body("idPais").
        optional().isNumeric(),
    body("domicilio").
        optional(),
    body("idProvincia").
        optional().isNumeric(),
    body("idBarrio").
        optional().isNumeric(),
    body("idLocalidad").
        optional().isNumeric(),
    body("telefonoFijo").
        optional(),
    body("telefonoMovil").
        optional(),
    body("email").
        optional(),
    body("tipoPersona").
        optional().isIn(['Fisica','Juridica']),
    body("idIntervinienteTipo").
        optional().isNumeric(),
    body("informacionAdicional").
        optional(),
    body("concurso").
        optional(),
    body("autoriaParticipacion").
        optional(),
    body("grado").
        optional(),
    body("estadoPreso").
        optional(),
    body("matriculaProfesional").
        optional(),           
    
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateUpdateIntervinienteVitima = [
  body("idDenuncia").optional().isNumeric(),
  body("idInterviniente").optional().isNumeric(),
  body("conocimientoVictima").optional().isBoolean(),
  body("vinculoVictima").optional().isIn(['Padre','Madre','Hijo/a','Hermano/a','Pareja','ExPareja','Familiar','Compañero','Otro']),
  body("detalleVinculo").optional(),
  body("dependeIngresos").optional().isBoolean(),
  body("hijosMenores").optional().isBoolean(),
  body("riesgoVida").optional().isBoolean(),
  (req, res, next) => {
      validateHelper(req, res, next)
  }
]

module.exports = {
  validateUpdateInterviniente,
  validateUpdateIntervinienteVitima,
}
