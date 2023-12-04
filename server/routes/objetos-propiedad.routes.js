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

const verifyJWT = require('../middlewares/verifyJWT')

const router = Router();

//MAIN MIDDLEWARES
router.use('/',verifyJWT, /* doubleCsrfProtection, csrfErrorHandler, */)

//crear 
router.post('/telefono-create', validateTelefonos, ObjetosPropiedadController.createTelefonos)
router.post('/automovile-create', validateAutomoviles, ObjetosPropiedadController.createAutomoviles)
router.post('/bicicleta-create', validateBicicletas, ObjetosPropiedadController.createBicicletas)
router.post('/cheque-create', validateCheques, ObjetosPropiedadController.createCheques)
router.post('/documentacion-create', validateDocumentacion, ObjetosPropiedadController.createDocumentacion)
router.post('/otro-create', validateOtro, ObjetosPropiedadController.createOtro)
router.post('/tarjeta-create', validateTarjetas, ObjetosPropiedadController.createTarjetas)
router.post('/autoparte-create', validateAutopartes, ObjetosPropiedadController.createAutopartes)

//editar

router.post('/telefono-update/:id',validateTelefonos,ObjetosPropiedadController.updateTelefonos)
router.post('/automovile-update/:id', validateAutomoviles, ObjetosPropiedadController.updateAutomoviles)
router.post('/bicicleta-update/:id', validateBicicletas, ObjetosPropiedadController.updateBicicletas)
router.post('/cheque-update/:id', validateCheques, ObjetosPropiedadController.updateCheques)
router.post('/documentacion-update/:id', validateDocumentacion, ObjetosPropiedadController.updateDocumentacion)
router.post('/otro-update/:id', validateOtro, ObjetosPropiedadController.updateOtro)
router.post('/tarjeta-update/:id', validateTarjetas, ObjetosPropiedadController.updateTarjetas)
router.post('/autoparte-update/:id', validateAutopartes, ObjetosPropiedadController.updateAutopartes)


module.exports = router;