const { Router } = require('express');

const DenunciasController = require('../controllers/denuncias.controller');
const {
  mainDenunciaCreate,
  mainDenunciaUpdate,
} = require('../controllers/main.controller');
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
  validateUpdateGeneral,
  validateUpdateGenero,
  validateUpdateBusquedaPersona,
  validateUpdateAbigeato,
  validateUpdateAbigeatoDetalles,
  validateUpdatePropiedad,
  validateUpdateDelitoPersona,
  validateUpdateDelitoSexual,
  validateUpdateDanos,
  validateUpdateIncidentesViales,
  validateUpdateIncidentesVialesVehiculos,
  validateUpdateMaltratoAnimal,
  validateUpdateFamiliar,
  validateUpload,
  validateConsultar,
} = require('../validators/denuncias');

const verifyJWT = require('../middlewares/verifyJWT');
const { uploadfileMem } = require('../middlewares/parseFilesMulter');

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
  '/create',
  uploadfileMem,
  ParseDataMiddleware,
  DenunciasController.createDenuncia
);

//-----------------------------------EDITAR DENUNCIAS-----------------------------------------------

router.post(
  '/general-update/:id',
  validateUpdateGeneral,
  DenunciasController.updateDenunciaGeneral
);

router.post(
  '/genero-update/:id',
  validateUpdateGenero,
  DenunciasController.updateDenunciaGenero
);

router.post(
  '/familiar-update/:id',
  validateUpdateFamiliar,
  DenunciasController.updateDenunciaFamiliar
);

router.post(
  '/abigeato-update/:id',
  validateUpdateAbigeato,
  DenunciasController.updateDenunciaAbigeato
);

router.post(
  '/abigeato-detalle-update/:id',
  validateUpdateAbigeatoDetalles,
  DenunciasController.updateDenunciaAbigeatoDetalles
);

router.post(
  '/propiedad-update/:id',
  validateUpdatePropiedad,
  DenunciasController.updateDenunciaPropiedad
);

router.post(
  '/delitos-personas-update/:id',
  validateUpdateDelitoPersona,
  DenunciasController.updateDenunciaDelitosPersonas
);

router.post(
  '/delitos-sexuales-update/:id',
  validateUpdateDelitoSexual,
  DenunciasController.updateDenunciaDelitosSexuales
);

router.post(
  '/danos-update/:id',
  validateUpdateDanos,
  DenunciasController.updateDenunciaDanos
);
router.post(
  '/incidente-vial-update/:id',
  validateUpdateIncidentesViales,
  DenunciasController.updateDenunciaIncidenteVial
);
router.post(
  '/incidente-vial-vehiculo-update/:id',
  validateUpdateIncidentesVialesVehiculos,
  DenunciasController.updateDenunciaIncidenteVialVehiculo
);
router.post(
  '/maltrato-animal-update/:id',
  validateUpdateMaltratoAnimal,
  DenunciasController.updateDenunciaMaltratoAnimal
);

router.post(
  '/busqueda-persona-hecho-update/:id',
  validateUpdateBusquedaPersona,
  DenunciasController.updateDenunciaBusquedaPersona
);

module.exports = router;
