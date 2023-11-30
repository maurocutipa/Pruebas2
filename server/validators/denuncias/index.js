const validateUpdateGeneral = require("./general")
const validateUpdateGenero = require("./genero")
const validateUpdateBusquedaPersona = require("./busqueda-persona")
const { validateUpdateAbigeato, validateUpdateAbigeatoDetalles} = require("./abigeato")
const { validateUpdateIncidentesViales, validateUpdateIncidentesVialesVehiculos} = require("./incidentes-viales")
const validateUpdatePropiedad = require("./propiedad")
const validateUpload = require("./upload")
const {validateUpdateDelitoPersona, validateUpdateDelitoSexual} = require("./delitos")
const validateUpdateDanos = require("./danos")
const validateUpdateMaltratoAnimal = require("./maltrato-animal")
const validateUpdateFamiliar = require("./familiar")
const validateMain = require('./main')

module.exports = {
    validateUpdateGeneral,
    validateUpdateGenero,
    validateUpdateBusquedaPersona,
    validateUpdateAbigeato, 
    validateUpdateAbigeatoDetalles,
    validateUpdatePropiedad,
    validateUpdateDelitoPersona,
    validateUpdateDelitoSexual,
    validateUpdateDanos,
    validateUpload,
    validateUpdateIncidentesViales,
    validateUpdateIncidentesVialesVehiculos,
    validateUpdateMaltratoAnimal,
    validateUpdateFamiliar,
    validateMain
}
