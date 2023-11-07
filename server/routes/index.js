const express = require("express");
const fs = require("fs");

const router = express.Router();
const removeFileExtension = require('../utils/removeFileExtension')

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeFileExtension(file);

    //autoload de las rutas
    if (name != 'index') {
        router.use(`/${name}`, require(`./${file}`));
    }
})
module.exports = router