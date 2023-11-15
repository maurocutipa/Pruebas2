const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateBusquedaPersona = [
    // Interviniente
    body("idInterviniente").exists().not().isEmpty(),
    // Denuncia
    body("idDenuncia").exists().not().isEmpty(),

    // Conyugue
    body("nombreConyugue").optional(),
    body("datosContactoConyugue").optional(),
    body("domicilioConyugue").optional(),
    body("telefonoLineaConyugue").optional(),
    body("celularConyugue").optional(),
    body("emailConyugue").optional(),

    // Padre
    body("nombrePadre").optional(),
    body("dniPadre").optional(),
    body("datosContactoPadre").optional(),
    body("domicilioPadre").optional(),
    body("telefonoLineaPadre").optional(),
    body("celularPadre").optional(),
    body("emailPadre").optional(),

    // Madre
    body("nombreMadre").optional(),
    body("dniMadre").optional(),
    body("datosContactoMadre").optional(),
    body("domicilioMadre").optional(),
    body("telefonoLineaMadre").optional(),
    body("celularMadre").optional(),
    body("emailMadre").optional(),

    // Trabajo
    body("lugarTrabajo").optional(),
    body("funcionTrabajo").optional(),
    body("datosCompañerosTrabajo").optional(),

    // Estudio
    body("lugarEstudio").optional(),
    body("direccionEstudio").optional(),
    body("datosCompañerosEstudio").optional(),

    /* Tipo de Denuncia */
    body("fugaHogar").optional(),
    body("trataPersonas").optional(),
    body("fugaInstitucion").optional(),
    body("averiguacionParadero").optional(),
    body("desaparcicion").optional(),
    body("violenciaInstitucional").optional(),
    body("otro").optional(),
    body("otroDetalle").if(body("otro").equals("1")).exists().not().isEmpty(),

    /* Datos del Hecho */
    body("latitudBusqueda").exists().not().isEmpty(),
    body("longitudBusqueda").exists().not().isEmpty(),
    body("fechaDesaparicion").exists().not().isEmpty(),
    body("lugarDesaparicion").exists().not().isEmpty(),
    body("contextoDesaparicion").exists().not().isEmpty(),
    body("relatoHecho").exists().not().isEmpty(),
    body("vestimentaDesaparicion").exists().not().isEmpty(),
    body("efectosPersonales").exists().not().isEmpty(),
    body("cambiosRecientes").exists().not().isEmpty(),
    body("personaInteres").exists().not().isEmpty(),
    body("busquedaTrabajo").exists().not().isEmpty(),

    /* Caracteristicas Fisicas */
    body("caracteristicasGenerales").exists().not().isEmpty(),
    body("altura").exists().not().isEmpty(),
    body("enfermedades").exists().not().isEmpty(),
    body("fracturas").exists().not().isEmpty(),
    body("rasgosOdontologicos").exists().not().isEmpty(),
    body("observaciones").exists().not().isEmpty(),
    body("fichasDentales").exists().not().isEmpty(),
    body("fichasDactiloscopicas").exists().not().isEmpty(),
    body("fotoCaracteristicas").exists().not().isEmpty(),

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateCreateBusquedaPersona