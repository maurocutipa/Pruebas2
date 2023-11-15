const multer = require('multer')
const getRandomString = require('../utils/generateRandomString')
const queryHandler = require('@utils/queryHandler')
const safeConcatQuery = require('@utils/safeConcatQuery')
//here define multer storages

const folders = {
    'file': {
        folder: 'uploads/denuncias-adjuntos',
        table: 'denuncia_adjuntos'
    },
    'filedni': {
        folder: 'uploads/intervinientes-adjuntos',
        table: 'interviniente_dni'
    }
}

const getSuffix = async (table) => {
    let suffix = getRandomString()
    while (true) {
        const query = safeConcatQuery('select count(*) as total from ', table, true) + ` where nombre_archivo like '%${suffix}%'`
        const [res] = await queryHandler(query)
        if (!res.total) break;
        suffix = getRandomString()
    }

    return suffix
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        folders[file.fieldname] && cb(null, folders[file.fieldname].folder)
    },
    filename: (req, file, cb) => {
        getSuffix(folders[file.fieldname].table).then(suffix => {
            let originalname = file.originalname
            if (file.fieldname == 'filedni')
                originalname = file.originalname.substring(file.originalname.indexOf('_') + 1)

            cb(null, `${suffix}-${originalname}`)
        })
    }
})


module.exports = storage