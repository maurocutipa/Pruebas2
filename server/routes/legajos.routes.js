const { Router } = require('express');

const {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
  getAccionTomada,
} = require('../controllers/legajos.controller');
const verifyJWT = require('../middlewares/verifyJWT');

const router = Router();

//MAIN MIDDLEWARES
router.use('/', verifyJWT);

router.get('/get-denunciados/:id', getDenunciadosParaLegajo);
router.post('/denuncia-legajo/:id', crearDenunciaLegajo);
router.get('/get-accion-tomada/:id', getAccionTomada);

module.exports = router;
