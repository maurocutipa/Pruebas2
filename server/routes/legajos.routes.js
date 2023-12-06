const { Router } = require('express');

const {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
  getAccionTomada,
  getLegajoById,
  archivarDenuncia,
  crearDenunciaNoPenal,
} = require('../controllers/legajos.controller');
const verifyJWT = require('../middlewares/verifyJWT');
const {
  comprobarAccionTomada,
} = require('../middlewares/comprobarAccionTomada');

const PersonaController = require('../controllers/personas.controller');

const router = Router();

//MAIN MIDDLEWARES
//router.use('/', verifyJWT);

router.get('/:id', getLegajoById);

router.get('/get-denunciados/:id', getDenunciadosParaLegajo);
router.get('/get-accion-tomada/:id', getAccionTomada);

router.post('/denuncia-legajo/:id', comprobarAccionTomada, crearDenunciaLegajo);
router.post('/archivar-denuncia', comprobarAccionTomada, archivarDenuncia);
router.post(
  '/crear-denuncia-no-penal',
  comprobarAccionTomada,
  crearDenunciaNoPenal,
  PersonaController.enviarNotificaciones
);

module.exports = router;
