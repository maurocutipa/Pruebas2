const { Router } = require('express');
const path = require('path');
const RestPKIMiddleware = require('../middlewares/RestPKIMiddleware')
const { uploadFile, uploadFileMem } = require('../config/restpki.storage')
const ParseMiddleware = require('../middlewares/ParseDataMiddleware')

const router = Router();

//COMIENZA EL PROCESO DE FIRMA
router.post('/start-signature', uploadFileMem, ParseMiddleware, RestPKIMiddleware.startSignature)

//TERMINA EL PROCESO DE FIRMA
router.post('/finish-signature', RestPKIMiddleware.finishSignature)


//TODO: USE NEW CONTROLLERS IN PKI-EXPRESS
//REALIZA UNA FIRMA PARA UN ARCHIVO TEMPORAL
router.post('/temp-signature', uploadFileMem, RestPKIMiddleware.startSignature)

//FIRMAR ARCHIVO EXISTENTE
router.post('/sign-existing',/* TODO: obtener path del archivo y firmar  */ RestPKIMiddleware.startSignature)

//VERIFICAR FIRMA
router.post('/verify-signature', uploadFileMem, RestPKIMiddleware.verifySignature)

//VERIFICAR FIRMA CON CODIGO
router.get('/verify-signature/:codigo', RestPKIMiddleware.verifySignatureByCode)

module.exports = router