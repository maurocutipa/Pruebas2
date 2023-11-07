const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpload = [
    check("id").exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateUpload