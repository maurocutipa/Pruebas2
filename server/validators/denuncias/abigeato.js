const { body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateAbigeato = [
    body("idDenuncia").
        exists().not().isEmpty().isNumeric(),
    body("violenciaFisica").
        optional().isNumeric({min:0,max:1}),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

const validateCreateAbigeatoDetalles = [
  body("*.idDenunciaAbigeato").
      exists().not().isEmpty().isNumeric(),
  body("*.idDenunciaAbigeatoDetallesEspecies").
      exists().not().isEmpty().isNumeric(),
  body("*.cantidad").
      exists().not().isEmpty().isNumeric(),
  body("*.detalle").
      optional(),
  (req, res, next) => {
      validateHelper(req, res, next)
  }
]

module.exports =  {validateCreateAbigeato, validateCreateAbigeatoDetalles}