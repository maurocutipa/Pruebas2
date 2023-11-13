const validateTelefonos = require('./telefonos')
const validateAutomoviles = require('./automoviles')
const validateBicicletas = require('./bicicletas')
const validateAutopartes = require('./autopartes')
const validateCheques = require('./cheques')
const validateDocumentacion = require('./documentacion')
const validateOtro = require('./otro')
const validateTarjetas = require('./tarjetas')



module.exports = {
    validateTelefonos,
    validateAutomoviles,
    validateBicicletas,
    validateAutopartes,
    validateCheques,
    validateDocumentacion,
    validateOtro,
    validateTarjetas
}