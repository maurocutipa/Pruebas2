const { Router } = require('express');

const DenunciasController = require('../controllers/denuncias.controller');
const { mainDenunciaCreate } = require('../controllers/main.controller');
const {
  doubleCsrfProtection,
  csrfErrorHandler,
} = require('../middlewares/CsrfMiddleware');
const UploadMiddleware = require('../middlewares/UploadMiddlware');
const ParseDataMiddleware = require('../middlewares/ParseDataMiddleware');
const ComprobanteMiddleware = require('../middlewares/ComprobanteMiddleware');

const AuditoriaController = require('../controllers/auditoria.controller');
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
  validateConsultar,
} = require('../validators/denuncias');

const verifyJWT = require('../middlewares/verifyJWT');

//MAIN MIDDLEWARES
router.use('/', verifyJWT /* doubleCsrfProtection, csrfErrorHandler, */);

router.post('/get-all', DenunciasController.getDenuncias);
router.get('/get-datos-filtros', DenunciasController.getDatosDeFiltros);
router.get('/get/:id', DenunciasController.getDenunciaById);
router.get(
  '/get-resumen-ratificar/:id',
  DenunciasController.getResumenParaRatificar
);
router.delete('/delete/:id', DenunciasController.deleteDenuncia);
router.patch('/ratificar-denuncia/:id', DenunciasController.ratificarDenuncia);
router.get('/esta-ratificada/:id', DenunciasController.estaRatificada);

router.post(
  '/general-create',
  validateCreateGeneral,
  DenunciasController.createDenunciaGeneral
);
router.post(
  '/genero-create',
  validateCreateGenero,
  DenunciasController.createDenunciaGenero
);
router.post(
  '/familiar-create',
  validateCreateFamiliar,
  DenunciasController.createDenunciaFamiliar
);
router.post(
  '/busqueda-persona-create',
  validateCreateBusquedaPersona,
  DenunciasController.createDenunciaBusquedaPersona
);
router.post(
  '/abigeato-create',
  validateCreateAbigeato,
  DenunciasController.createDenunciaAbigeato
);
router.post(
  '/abigeato-detalle-create',
  validateCreateAbigeatoDetalles,
  DenunciasController.createDenunciaAbigeatoDetalles
);
router.post(
  '/propiedad-create',
  validateCreatePropiedad,
  DenunciasController.createDenunciaPropiedad
);
router.post(
  '/delitos-personas-create',
  validateCreateDelitoPersona,
  DenunciasController.createDenunciaDelitosPersonas
);
router.post(
  '/delitos-sexuales-create',
  validateCreateDelitoSexual,
  DenunciasController.createDenunciaDelitosSexuales
);
router.post(
  '/danos-create',
  validateCreateDanos,
  DenunciasController.createDenunciaDanos
);
router.post(
  '/incidente-vial-create',
  validateCreateIncidentesViales,
  DenunciasController.createDenunciaIncidenteVial
);
router.post(
  '/incidente-vial-vehiculo-create',
  validateCreateIncidentesVialesVehiculos,
  DenunciasController.createDenunciaIncidenteVialVehiculo
);
router.post(
  '/maltrato-animal-create',
  validateCreateMaltratoAnimal,
  DenunciasController.createDenunciaMaltratoAnimal
);

router.post(
  '/create',
  UploadMiddleware,
  ParseDataMiddleware,
  validateMain,
  mainDenunciaCreate,
  ComprobanteMiddleware,
  AuditoriaController.denunciaAuditoria
);

module.exports = router;
