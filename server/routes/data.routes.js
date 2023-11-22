const { Router } = require('express');

const { getDelitos } = require('../controllers/data.controller');
const verifyJWT = require('../middlewares/verifyJWT')

const router = Router();

//MAIN MIDDLEWARES
router.use('/', verifyJWT)

router.get('/get-delitos', getDelitos);

module.exports = router;
