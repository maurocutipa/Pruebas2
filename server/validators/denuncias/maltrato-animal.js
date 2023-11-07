const { body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateMaltratoAnimal = [
    body("idDenuncia").
        exists().not().isEmpty().isNumeric(),
    body("condicionAnimal").
        exists().not().isEmpty().isIn(['Murio','Vive']),
    body("atencionVeterinaria").
        exists().not().isEmpty().isIn(['Si','No','No Sabe']),
    body("relacionAnimal").
        exists().not().isEmpty().isIn(['Propietario','Guardian','Medico Veterinario','Vecino','Otro']),
    body("tipoAnimal").
        exists().not().isEmpty().isIn(['Domestico','Exotico','Silvestre']),
    body("tomoConocimiento").
        exists().not().isEmpty().isIn(['Le Contaron','Noticias','Redes Sociales','Testigo Presencial']),
    body("convivenciaIndeterminado").
        optional().isNumeric({min:0, max:1}),
    body("convivenciaAdultosMayores").
        optional().isNumeric({min:0, max:1}),
    body("convivenciaNinos").
        optional().isNumeric({min:0, max:1}),
    body("convivenciaOtro").
        optional().isNumeric({min:0, max:1}),
    body("convivenciaDiscapacidad").
        optional().isNumeric({min:0, max:1}),

    body("violenciaCometida").
        exists().not().isEmpty().isIn(['Propietario','Familiar del Propietario','Vecino','Guardian','Persona Mayor de Edad','Persona Menor de Edad','Otro']),
    body("abusoAnimal").
        exists().not().isEmpty().isIn(['Si','No','No Sabe']),
    body("abusoFuncionario").
        exists().not().isEmpty().isIn(['Si','No','No Sabe']),

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateCreateMaltratoAnimal