const path = require('path')
const multer = require('multer');

//DISK STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/firma-digital'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadFile = multer({ storage: storage }).single('fileFirma')

//MEMORY STORAGE
const memStorage = multer.memoryStorage()

const uploadFileMem = multer({ storage: memStorage }).single('fileFirma')


module.exports = { uploadFile, uploadFileMem }