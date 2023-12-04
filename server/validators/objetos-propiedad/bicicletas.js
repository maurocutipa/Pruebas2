const { body,check } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateBicicletas = [
    
    body("idDenunciaPropiedad").
        if(check("id").exists()).
        not().exists().notEmpty(),

    body("idDenunciaBicicletasTipo").
        optional().isNumeric(),
    body("marca").
        optional(),
    body("rodado").
        optional(),   
    body("numSerie").
        optional(),
    body("colorCuadro").
        optional(),
    body("seguro").
        optional(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateBicicletas