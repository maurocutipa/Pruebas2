const {Router} = require('express');

const IntervinienteController = require ('../controllers/interviniente.controller');
const {doubleCsrfProtection, csrfErrorHandler} = require('../middlewares/CsrfMiddleware')

const { validateCreateInterviniente, validateCreateIntervinienteDenuncia, validateCreateIntervinienteVitima, validateUpload } = require('../validators/intervinientes')

const router = Router();


router.post('/create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateInterviniente, IntervinienteController.createInterviniente);
router.post('/interviniente-denuncia-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateIntervinienteDenuncia, IntervinienteController.createIntervinienteDenuncia);
router.post('/interviniente-victima-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateIntervinienteVitima, IntervinienteController.createIntervinienteVictima);
//router.put('/upload/:id', /* doubleCsrfProtection, csrfErrorHandler, */ validateUpload, IntervinienteController.uploadFile);


module.exports = router;