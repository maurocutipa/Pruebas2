const { Router } = require('express');
const NotificacionesController = require('@controllers/notificaciones.controller');

const router = Router();


router.post('/personas', NotificacionesController.getPersonas)

module.exports = router