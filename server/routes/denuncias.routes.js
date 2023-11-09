const { Router } = require('express');

const {
  getDenuncias,
  getDatosDeFiltros,
  deleteDenuncia,
} = require('../controllers/denuncias.controller');

const router = Router();

router.post('/get-all', getDenuncias);
router.get('/get-datos-filtros', getDatosDeFiltros);
router.delete('/delete/:id', deleteDenuncia);

module.exports = router;
