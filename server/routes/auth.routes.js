const AuthController = require('../controllers/auth.controller')
const express = require('express')
const verifyJWT = require('../middlewares/verifyJWT')

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', verifyJWT, AuthController.refresh);

module.exports = router