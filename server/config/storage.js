const multer = require('multer')

//here define multer storages

const folders = {
    'file': 'uploads/denuncias-adjuntos',
    'filedni': 'uploads/intervinientes-adjuntos'
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        folders[file.fieldname] && cb(null, folders[file.fieldname])
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() //generate cryptographic random id
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})


module.exports = storage
