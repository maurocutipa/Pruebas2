const multer = require("multer");
const storage = require('@config/storage');
const showError = require("@utils/showError");
const HttpErrorHandler = require("@utils/httpErrorHandler");


const upload = multer({
    storage,
}).any()

const UploadMiddleware = (req,res,next) => {
    upload(req,res, (err) => {
        if(err){
            showError(err)
            HttpErrorHandler(res)
        }
        else next()
    })
}


module.exports = UploadMiddleware