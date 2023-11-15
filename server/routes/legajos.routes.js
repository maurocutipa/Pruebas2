const { Router } = require('express');

const {
  getDenunciadosParaLegajo,
} = require('../controllers/legajos.controller');

const router = Router();

router.get('/get-denunciados/:id', getDenunciadosParaLegajo);

module.exports = router;
