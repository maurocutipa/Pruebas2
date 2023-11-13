const { Router } = require('express');

const ObjetosPropiedadController = require('@controllers/objetos.propiedad.controller');
const { doubleCsrfProtection, csrfErrorHandler } = require('@middlewares/CsrfMiddleware')

const { 
    validateTelefonos, 
    validateAutomoviles,
    validateBicicletas,
    validateCheques,
    validateDocumentacion,
    validateOtro,
    validateAutopartes,
    validateTarjetas
} = require('@validators/objetos-propiedad')

const router = Router();


router.post('/telefonos', validateTelefonos, ObjetosPropiedadController.createTelefonos)
router.post('/automoviles', validateAutomoviles, ObjetosPropiedadController.createAutomoviles)
router.post('/bicicletas', validateBicicletas, ObjetosPropiedadController.createBicicletas)
router.post('/cheques', validateCheques, ObjetosPropiedadController.createCheques)
router.post('/documentacion', validateDocumentacion, ObjetosPropiedadController.createDocumentacion)
router.post('/otro', validateOtro, ObjetosPropiedadController.createOtro)
router.post('/tarjetas', validateTarjetas, ObjetosPropiedadController.createTarjetas)
router.post('/autopartes', validateAutopartes, ObjetosPropiedadController.createAutopartes)

module.exports = router;