const { Router } = require('express');
const path = require('path');
const RestPKIMiddleware = require('../middlewares/RestPKIMiddleware')
const { uploadFile, uploadFileMem } = require('../config/restpki.storage')

const router = Router();

//COMIENZA EL PROCESO DE FIRMA
router.post('/start-signature', uploadFileMem, RestPKIMiddleware.startSignature)

//TERMINA EL PROCESO DE FIRMA
router.post('/finish-signature', RestPKIMiddleware.finishSignature)

//REALIZA UNA FIRMA PARA UN ARCHIVO TEMPORAL
router.post('/temp-signature', uploadFileMem, RestPKIMiddleware.startSignature)

//FIRMAR ARCHIVO EXISTENTE
router.post('/sign-existing',/* TODO: obtener path del archivo y firmar  */ RestPKIMiddleware.startSignature)

//VERIFICAR FIRMA
router.post('/verify-signature', uploadFileMem, RestPKIMiddleware.verifySignature)

module.exports = router