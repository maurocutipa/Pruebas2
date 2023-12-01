const {    
  
  validateCreateInterviniente,
  validateCreateIntervinienteDenuncia,
  validateCreateIntervinienteVitima,
  validateUpload  } = require("./intervinientes.create")

const {
  validateUpdateInterviniente,
  validateUpdateIntervinienteVitima,} = require("./intervinientes.update")

  
module.exports = {
  validateCreateInterviniente,
  validateCreateIntervinienteDenuncia,
  validateCreateIntervinienteVitima,
  validateUpload,
  validateUpdateInterviniente,
  validateUpdateIntervinienteVitima,
}
