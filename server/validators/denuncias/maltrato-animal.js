const { body, check } = require('express-validator');
const validateHelper = require('../../utils/validateHelper');

const validateUpdateMaltratoAnimal = [
  check('id').exists().not().isEmpty().isNumeric(),

  body('condicionAnimal').optional().isIn(['Murio', 'Vive']),
  body('atencionVeterinaria').optional().isIn(['Si', 'No', 'No Sabe']),
  body('relacionAnimal')
    .optional()
    .isIn(['Propietario', 'Guardian', 'Medico Veterinario', 'Vecino', 'Otro']),
  body('tipoAnimal').optional().isIn(['Domestico', 'Exotico', 'Silvestre']),
  body('tomoConocimiento')
    .optional()
    .isIn(['Le Contaron', 'Noticias', 'Redes Sociales', 'Testigo Presencial']),
  body('convivenciaIndeterminado').optional().isBoolean(),
  body('convivenciaAdultosMayores').optional().isBoolean(),
  body('convivenciaNinos').optional().isBoolean(),
  body('convivenciaOtro').optional().isBoolean(),
  body('convivenciaDiscapacidad').optional().isBoolean(),

  body('violenciaCometida')
    .optional()
    .isIn([
      'Propietario',
      'Familiar del Propietario',
      'Vecino',
      'Guardian',
      'Persona Mayor de Edad',
      'Persona Menor de Edad',
      'Otro',
    ]),
  body('abusoAnimal').optional().isIn(['Si', 'No', 'No Sabe']),
  body('abusoFuncionario').optional().isIn(['Si', 'No', 'No Sabe']),

  (req, res, next) => {
    validateHelper(req, res, next);
  },
];

module.exports = validateUpdateMaltratoAnimal;
