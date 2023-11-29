const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateBusquedaPersona = [

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
    body("otroDetalle").optional(),

    /* Datos del Hecho */
    body("latitudBusqueda").optional(),
    body("longitudBusqueda").optional(),
    body("fechaDesaparicion").optional(),
    body("lugarDesaparicion").optional(),
    body("contextoDesaparicion").optional(),
    body("relatoHecho").optional(),
    body("vestimentaDesaparicion").optional(),
    body("efectosPersonales").optional(),
    body("cambiosRecientes").optional(),
    body("personaInteres").optional(),
    body("busquedaTrabajo").optional(),

    /* Caracteristicas Fisicas */
    body("caracteristicasGenerales").optional(),
    body("altura").optional(),
    body("enfermedades").optional(),
    body("fracturas").optional(),
    body("rasgosOdontologicos").optional(),
    body("observaciones").optional(),
    body("fichasDentales").optional(),
    body("fichasDactiloscopicas").optional(),
    body("fotoCaracteristicas").optional(),

    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateUpdateBusquedaPersona