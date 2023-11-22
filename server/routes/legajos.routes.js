const { Router } = require('express');

const {
  getDenunciadosParaLegajo,
} = require('../controllers/legajos.controller');

const verifyJWT = require('../middlewares/verifyJWT')

const router = Router();

//MAIN MIDDLEWARES
router.use('/', verifyJWT)

router.get('/get-denunciados/:id', getDenunciadosParaLegajo);

module.exports = router;
