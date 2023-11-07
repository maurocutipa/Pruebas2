const { Router } = require('express');

const {
  getDenuncias,
  getDatosDeFiltros,
} = require('../controllers/denuncias.controller');

const router = Router();

router.post('/get-all', getDenuncias);
router.get('/get-datos-filtros', getDatosDeFiltros);

module.exports = router;
