const { Router } = require('express');

const {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
} = require('../controllers/legajos.controller');
const verifyJWT = require('../middlewares/verifyJWT');

const router = Router();

//MAIN MIDDLEWARES
router.use('/', verifyJWT);

router.get('/get-denunciados/:id', getDenunciadosParaLegajo);
router.post('/denuncia-legajo/:id', crearDenunciaLegajo);

module.exports = router;
