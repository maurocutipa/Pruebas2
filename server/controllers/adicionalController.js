const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');
const { matchedData } = require('express-validator');
const convertToSnakeCase = require('../utils/convertToSnakeCase');
const showError = require('@utils/showError')

const AdicionalController = {}

AdicionalController.getBarrios = async (req,res) => {
    try {
        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)
        let query = `select id_barrio as value, nombre_barrio as name from barrios order by name`
        if(values.length > 0)
            query = `select id_barrio as value, nombre_barrio as name from barrios where id_departamento = ? order by name`;

        const queryResult = await queryHandler(query,values);

        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getProvincias = async (req,res) => {
    try {
        const query = `select id_provincia as value, nombre_provincia as name, centroide_latitud as latitud, centroide_longitud as longitud from provincias`;

        const queryResult = await queryHandler(query);
        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getDepartamentos = async (req,res) => {
    try {
        const query = `select id_departamento as value, nombre as name from departamentos order by name`;

        const queryResult = await queryHandler(query);
        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

// To Do -----

AdicionalController.getLocalidades= async (req,res) => {
    try {
        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)

        let query = 'select id_localidad as value, nombre as name, centroide_latitud as latitud, centroide_longitud as longitud from localidades'
        if(values.length)
            query = `select id_localidad as value, nombre as name, centroide_latitud as latitud, centroide_longitud as longitud from localidades where id_departamento = ?`;

        const queryResult = await queryHandler(query,values);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}


AdicionalController.getNacionalidades = async (req,res) => {
    try {

        const query = `select id_interviniente_nacionalidad as value, nacionalidad as name from interviniente_nacionalidad where estado = 1 order by name`;

        const queryResult = await queryHandler(query);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getAutomovilesMarcas = async (req,res) => {
    try {

        const query = `select id_denuncia_automoviles_marca as value, marca as name from denuncia_automoviles_marcas where estado = 1 order by name`;

        const queryResult = await queryHandler(query);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getAutomovilesTipos = async (req,res) => {
    try {

        const query = `select id_denuncia_automoviles_tipo as value, tipo as name from denuncia_automoviles_tipos where estado = 1 order by name`;

        const queryResult = await queryHandler(query);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getBicicletasTipos = async (req,res) => {
    try {

        const query = `select id_denuncia_bicicletas_tipo as value, tipo as name from denuncia_bicicletas_tipos where estado = 1 order by name`;

        const queryResult = await queryHandler(query);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getCalularesMarcas = async (req,res) => {
    try {

        const query = `select id_denuncia_celulares_marca as value, marca as name from denuncia_celulares_marcas where estado = 1 order by name`;

        const queryResult = await queryHandler(query);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getTarjetasEmisores = async (req,res) => {
    try {

        const query = `select id_denuncia_propiedad_tarjetas_emisores as value, nombre as name from denuncia_propiedad_tarjetas_emisores where estado = 1 order by name`;

        const queryResult = await queryHandler(query);


        
        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

AdicionalController.getTiposDenuncias = async (req,res) => {
    try {

        const query = `select id_tipo_denuncia as value, nombre as name from denuncia_tipos`;

        const queryResult = await queryHandler(query);


        res.status(200).json({
            data: queryResult,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Server Error', false);
    }
}

module.exports = AdicionalController