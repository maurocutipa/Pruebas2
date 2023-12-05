const { body, check } = require('express-validator');
const validateHelper = require('../../utils/validateHelper');

const validateUpdateAbigeato = [
  check('id').exists().not().isEmpty().isNumeric(),
  body('violenciaFisica').optional().isBoolean(),
  (req, res, next) => {
    validateHelper(req, res, next);
  },
];

const validateUpdateAbigeatoDetalles = [
  body('*.idDenunciaAbigeato').optional().isNumeric(),
  body('*.idDenunciaAbigeatoDetallesEspecies').optional().isNumeric(),
  body('*.cantidad').optional().isNumeric(),
  body('*.detalle').optional(),
  (req, res, next) => {
    validateHelper(req, res, next);
  },
];

module.exports = { validateUpdateAbigeato, validateUpdateAbigeatoDetalles };
