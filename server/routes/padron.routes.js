const { Router } = require('express')
const PadronController = require('@controllers/padron.controller')


const router = Router()



router.get('/dni/:dni', PadronController.getByDni)


module.exports = router