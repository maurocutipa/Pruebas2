const { Router } = require('express');

const IntervinienteController = require('../controllers/interviniente.controller');
const { doubleCsrfProtection, csrfErrorHandler } = require('../middlewares/CsrfMiddleware')

const { 
  validateCreateInterviniente, 
  validateCreateIntervinienteDenuncia, 
  validateCreateIntervinienteVitima, 
  validateUpload,
  validateUpdateInterviniente,
  validateUpdateIntervinienteVitima,
  validateMain,
 } = require('../validators/intervinientes/index')
const verifyJWT = require('../middlewares/verifyJWT')

const router = Router();

//MAIN MIDDLEWARES
router.use('/', verifyJWT, /* doubleCsrfProtection, csrfErrorHandler, */)

router.post('/create',  validateMain, IntervinienteController.mainIntervinienteCreate);
router.post('/interviniente-create',  validateCreateInterviniente, IntervinienteController.createInterviniente);
router.post('/interviniente-denuncia-create', validateCreateIntervinienteDenuncia, IntervinienteController.createIntervinienteDenuncia);
router.post('/interviniente-victima-create', validateCreateIntervinienteVitima, IntervinienteController.createIntervinienteVictima);
//router.put('/upload/:id', validateUpload, IntervinienteController.uploadFile);

router.post('/update',  validateMain, IntervinienteController.mainIntervinienteUpdate);
router.post('/interviniente-update/:id',  validateUpdateInterviniente, IntervinienteController.updateInterviniente);
router.post('/interviniente-victima-update/:id', validateUpdateIntervinienteVitima, IntervinienteController.updateIntervinienteVictima);

module.exports = router;