const { Router } = require('express');

const {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
  getAccionTomada,
  getLegajoById,
  archivarDenuncia,
} = require('../controllers/legajos.controller');
const verifyJWT = require('../middlewares/verifyJWT');

const router = Router();

//MAIN MIDDLEWARES
//router.use('/', verifyJWT);

router.get('/:id', getLegajoById);

router.get('/get-denunciados/:id', getDenunciadosParaLegajo);
router.post('/denuncia-legajo/:id', crearDenunciaLegajo);
router.get('/get-accion-tomada/:id', getAccionTomada);
router.post('/archivar-denuncia', archivarDenuncia);

module.exports = router;
