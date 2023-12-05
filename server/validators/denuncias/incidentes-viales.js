const { check,body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateIncidentesViales = [
    check("id").exists().not().isEmpty().isNumeric(),
    
    body("cantVehiculos").
        optional().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateUpdateIncidentesVialesVehiculos = [

  body("*.idDenunciaAutomovilesTipo").
      optional().isNumeric(),
  body("*.idDenunciaAutomovilesMarca").
      optional().isNumeric(),
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

module.exports =  {validateUpdateIncidentesViales, validateUpdateIncidentesVialesVehiculos}