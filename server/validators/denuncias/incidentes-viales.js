const { body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateIncidentesViales = [
    body("idDenuncia").
        exists().not().isEmpty().isNumeric(),
    body("cantVehiculos").
        exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateCreateIncidentesVialesVehiculos = [
  body("*.idDenunciaIncidentesViales").
      exists().not().isEmpty().isNumeric(),
  body("*.idDenunciaAutomovilesTipo").
      exists().not().isEmpty().isNumeric(),
  body("*.idDenunciaAutomovilesMarca").
      exists().not().isEmpty().isNumeric(),
  body("*.modelo").
      optional(),
  body("*.dominio").
      optional(),
  body("*.anioFabricacion").
      optional(),
  body("*.numMotor").
      optional(),
  body("*.puertas").
      optional(),
  body("*.titular").
      optional(),
  body("*.gnc").
      optional(),
  body("*.observaciones").
      optional(),
  (req, res, next) => {
      validateHelper(req, res, next)
  }
]

module.exports =  {validateCreateIncidentesViales, validateCreateIncidentesVialesVehiculos}