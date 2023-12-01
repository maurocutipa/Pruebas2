const {    
  
  validateCreateInterviniente,
  validateCreateIntervinienteDenuncia,
  validateCreateIntervinienteVitima,
  validateUpload  } = require("./intervinientes.create")

const {
  validateUpdateInterviniente,
  validateUpdateIntervinienteVitima,} = require("./intervinientes.update")

const validateMain = require("./main")
  
module.exports = {
  validateCreateInterviniente,
  validateCreateIntervinienteDenuncia,
  validateCreateIntervinienteVitima,
  validateUpload,
  validateUpdateInterviniente,
  validateUpdateIntervinienteVitima,
  validateMain
}
