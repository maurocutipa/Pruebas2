const { Router } = require('express');

const DenunciasController = require('../controllers/denuncias.controller');
const { mainDenunciaCreate, mainDenunciaUpdate } = require('../controllers/main.controller');
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

//MAIN MIDDLEWARES
//router.use('/', verifyJWT /* doubleCsrfProtection, csrfErrorHandler, */);

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


//-----------------------------------EDITAR DENUNCIAS-----------------------------------------------

router.post(
  '/general-update/:id',
  validateUpdateGeneral,
  DenunciasController.updateDenunciaGeneral
);

router.post(
  '/genero-update',
  validateUpdateGenero,
  DenunciasController.updateDenunciaGenero
);

router.post(
  '/familiar-update',
  validateUpdateFamiliar,
  DenunciasController.updateDenunciaFamiliar
);

router.post(
  '/busqueda-persona-update',
  validateUpdateBusquedaPersona,
  DenunciasController.updateDenunciaBusquedaPersona
);

router.post(
  '/abigeato-update',
  validateUpdateAbigeato,
  DenunciasController.updateDenunciaAbigeato
);

router.post(
  '/abigeato-detalle-update',
  validateUpdateAbigeatoDetalles,
  DenunciasController.updateDenunciaAbigeatoDetalles
);

router.post(
  '/propiedad-update',
  validateUpdatePropiedad,
  DenunciasController.updateDenunciaPropiedad
);

router.post(
  '/delitos-personas-update',
  validateUpdateDelitoPersona,
  DenunciasController.updateDenunciaDelitosPersonas
);

router.post(
  '/delitos-sexuales-update',
  validateUpdateDelitoSexual,
  DenunciasController.updateDenunciaDelitosSexuales
);

router.post(
  '/danos-update',
  validateUpdateDanos,
  DenunciasController.updateDenunciaDanos
);
router.post(
  '/incidente-vial-update',
  validateUpdateIncidentesViales,
  DenunciasController.updateDenunciaIncidenteVial
);
router.post(
  '/incidente-vial-vehiculo-update',
  validateUpdateIncidentesVialesVehiculos,
  DenunciasController.updateDenunciaIncidenteVialVehiculo
);
router.post(
  '/maltrato-animal-update',
  validateUpdateMaltratoAnimal,
  DenunciasController.updateDenunciaMaltratoAnimal
);


module.exports = router;
