const validateCreateGeneral = require("./general")
const validateCreateGenero = require("./genero")

const validateCreateBusquedaPersona = require("./busqueda-persona")
const { validateCreateAbigeato, validateCreateAbigeatoDetalles} = require("./abigeato")
const { validateCreateIncidentesViales, validateCreateIncidentesVialesVehiculos} = require("./incidentes-viales")
const validateCreatePropiedad = require("./propiedad")
const validateUpload = require("./upload")
const {validateCreateDelitoPersona, validateCreateDelitoSexual} = require("./delitos")
const validateCreateDanos = require("./danos")
const validateCreateMaltratoAnimal = require("./maltrato-animal")
const validateCreateFamiliar = require("./familiar")
const validateMain = require('./main')

module.exports = {
    validateCreateGeneral,
    validateCreateGenero,
    validateCreateBusquedaPersona,
    validateCreateAbigeato, 
    validateCreateAbigeatoDetalles,
    validateCreatePropiedad,
    validateCreateDelitoPersona,
    validateCreateDelitoSexual,
    validateCreateDanos,
    validateUpload,
    validateCreateIncidentesViales,
    validateCreateIncidentesVialesVehiculos,
    validateCreateMaltratoAnimal,
    validateCreateFamiliar,
    validateMain
}
