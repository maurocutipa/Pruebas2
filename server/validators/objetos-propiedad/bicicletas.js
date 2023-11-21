const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateBicicletas = [
    body().exists().not().isEmpty().isArray(),
    body("*.idDenunciaPropiedad").
        exists().not().isEmpty().isNumeric(),
    body("*.idDenunciaBicicletasTipo").
        exists().not().isEmpty().isNumeric(),
    body("*.marca").
        optional(),
    body("*.rodado").
        optional(),   
    body("*.numSerie").
        optional(),
    body("*.colorCuadro").
        optional(),
    body("*.seguro").
        optional(),
    body("*.observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateBicicletas