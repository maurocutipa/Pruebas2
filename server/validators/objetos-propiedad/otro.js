const { body,check } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateOtro = [

    body("idDenunciaPropiedad").
        if(check("id").exists()).
        not().exists().notEmpty(),

    body("tipo").
        optional(),   
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateOtro