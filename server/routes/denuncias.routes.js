const { Router } = require('express');

const DenunciasController = require('../controllers/denuncias.controller');
const { mainDenunciaCreate } = require('../controllers/main.controller')
const { doubleCsrfProtection, csrfErrorHandler } = require('../middlewares/CsrfMiddleware')
const UploadMiddleware = require('../middlewares/UploadMiddlware')
const ParseDataMiddleware = require('../middlewares/ParseDataMiddleware')
const ComprobanteMiddleware = require('../middlewares/ComprobanteMiddleware');

const AuditoriaMiddleware = require("../middlewares/auditoriaMiddleware")

const router = Router();

const {
  validateCreateGeneral,
  validateCreateGenero,
  validateCreateBusquedaPersona,
  validateCreatePropiedad,
  validateCreateDelitoPersona,
  validateCreateDelitoSexual,
  validateCreateDanos,
  validateUpload,
  validateCreateAbigeato,
  validateCreateAbigeatoDetalles,
  validateCreateIncidentesViales,
  validateCreateIncidentesVialesVehiculos,
  validateCreateMaltratoAnimal,
  validateCreateFamiliar,
  validateMain,
  validateConsultar

} = require('../validators/denuncias');

router.post('/get-all', DenunciasController.getDenuncias);
router.patch('/ratificar-denuncia/:id', DenunciasController.ratificarDenuncia);
router.get('/get-datos-filtros', DenunciasController.getDatosDeFiltros);
router.get('/get/:id', DenunciasController.getDenunciaById);
router.delete('/delete/:id', DenunciasController.deleteDenuncia);

router.post('/general-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateGeneral, DenunciasController.createDenunciaGeneral);
router.post('/genero-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateGenero, DenunciasController.createDenunciaGenero);
router.post('/familiar-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateFamiliar, DenunciasController.createDenunciaFamiliar);
router.post('/busqueda-persona-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateBusquedaPersona, DenunciasController.createDenunciaBusquedaPersona);
router.post('/abigeato-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateAbigeato, DenunciasController.createDenunciaAbigeato);
router.post('/abigeato-detalle-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateAbigeatoDetalles, DenunciasController.createDenunciaAbigeatoDetalles);
router.post('/propiedad-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreatePropiedad, DenunciasController.createDenunciaPropiedad);
router.post('/delitos-personas-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateDelitoPersona, DenunciasController.createDenunciaDelitosPersonas);
router.post('/delitos-sexuales-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateDelitoSexual, DenunciasController.createDenunciaDelitosSexuales);
router.post('/danos-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateDanos, DenunciasController.createDenunciaDanos);
router.post('/incidente-vial-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateIncidentesViales, DenunciasController.createDenunciaIncidenteVial);
router.post('/incidente-vial-vehiculo-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateIncidentesVialesVehiculos, DenunciasController.createDenunciaIncidenteVialVehiculo);
router.post('/maltrato-animal-create', /* doubleCsrfProtection, csrfErrorHandler, */ validateCreateMaltratoAnimal, DenunciasController.createDenunciaMaltratoAnimal);

//router.put('/upload/:id', validateUpload, DenunciasController.uploadFile)


router.post('/create', UploadMiddleware,  ParseDataMiddleware, validateMain, mainDenunciaCreate, ComprobanteMiddleware, AuditoriaMiddleware)

//router.post('/consultar', validateConsultar, DenunciasController.getDenuncia)


module.exports = router;
