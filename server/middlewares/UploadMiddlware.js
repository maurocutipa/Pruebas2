const multer = require("multer");
const storage = require('../config/storage')

const UploadMiddleware = multer({
    storage
})


module.exports = UploadMiddleware