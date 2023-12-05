const { Router } = require('express');
const PersonaController = require('@controllers/personas.controller');

const router = Router();


router.post('/get-all', PersonaController.getPersonas)
router.get('/get-grupos', PersonaController.getGrupos)
router.post('/enviar-notificaciones', PersonaController.enviarNotificaciones)

module.exports = router