const { Router } = require('express');

const {
  getDenuncias,
  getDatosDeFiltros,
  deleteDenuncia,
  getDenunciaById,
} = require('../controllers/denuncias.controller');

const router = Router();

router.post('/get-all', getDenuncias);
router.get('/get-datos-filtros', getDatosDeFiltros);
router.get('/get/:id', getDenunciaById);
router.delete('/delete/:id', deleteDenuncia);

module.exports = router;
