
const { check, body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')


const validateMain = [
    /* ...intervinientes,
    ...denuncia,
    ...denunciaVictima, */
    body('denuncia').exists().not().isEmpty(),
    body('intervinientes').optional().isArray(),
    body('denunciantes').optional().isArray(),
    body('victimasRelaciones').optional().isArray(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateMain