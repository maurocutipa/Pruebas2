const AdicionalController = require('../controllers/adicionalController')
const express = require('express')
const { validateGetBarrios, validateGetlocalidad } = require('../validators/adicional/adicional')

const router = express.Router()

router.get('/barrios/:id', validateGetBarrios, AdicionalController.getBarrios)
router.get('/provincias', AdicionalController.getProvincias)
router.get('/departamentos', AdicionalController.getDepartamentos)
router.get('/localidades/:id', validateGetlocalidad, AdicionalController.getLocalidades)
router.get('/nacionalidades', AdicionalController.getNacionalidades)

router.get('/', AdicionalController.getNacionalidades)

module.exports = router