const { Router } = require('express');

const { getDelitos } = require('../controllers/data.controller');

const router = Router();

router.get('/get-delitos', getDelitos);

module.exports = router;
