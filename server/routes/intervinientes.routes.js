const { Router } = require('express');

const IntervinienteController = require('../controllers/interviniente.controller');
const { doubleCsrfProtection, csrfErrorHandler } = require('../middlewares/CsrfMiddleware')

const { validateCreateInterviniente, validateCreateIntervinienteDenuncia, validateCreateIntervinienteVitima, validateUpload } = require('../validators/intervinientes')
const verifyJWT = require('../middlewares/verifyJWT')

const router = Router();

//MAIN MIDDLEWARES
router.use('/', verifyJWT, /* doubleCsrfProtection, csrfErrorHandler, */)

router.post('/create',  validateCreateInterviniente, IntervinienteController.createInterviniente);
router.post('/interviniente-denuncia-create', validateCreateIntervinienteDenuncia, IntervinienteController.createIntervinienteDenuncia);
router.post('/interviniente-victima-create', validateCreateIntervinienteVitima, IntervinienteController.createIntervinienteVictima);
//router.put('/upload/:id', validateUpload, IntervinienteController.uploadFile);


module.exports = router;