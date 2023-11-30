const multer = require('multer');

const memStorage = multer.memoryStorage()

const uploadfile = multer({ storage: memStorage }).any()

module.exports = { uploadFileMem }