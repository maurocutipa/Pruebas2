const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateCheques = [
    body("tipo").
        optional().isIn(['Cancelatorio','Certificado - Conformado','Cruzado','De Caja','De Viajero','En Blanco','Otro','Pago Diferido','Para Abono en Cuenta']),   
    body("banco").
        optional(),
    body("sucursal").
        optional(),
    body("titularCuenta").
        optional(),
    body("numeroCuenta").
        optional(),
    body("numeroCheque").
        optional(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateCheques