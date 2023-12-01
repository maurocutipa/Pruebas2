const multer = require('multer');

const memStorage = multer.memoryStorage()

const uploadfileMem = multer({ storage: memStorage }).any()

module.exports = { uploadfileMem }