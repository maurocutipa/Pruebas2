const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');
const safeConcatQuery = require('../utils/safeConcatQuery');
const convertToSnakeCase = require('../utils/convertToSnakeCase')
const { matchedData } = require('express-validator');
const dayjs = require('dayjs')
const showError = require('@utils/showError')
const axios = require('axios')
const { interntalAPI } = require('@config/http')
const oneToManyHelper = require('@utils/oneToManyHelper')


const IntervinienteController = {}


//-------------crear intervininete en ver denuncia

IntervinienteController.mainIntervinienteCreate = async (req, res, next) => {
    try {
        
        let {interviniente,victimaRelacion,idDenuncia} = matchedData(req)
        //formateo de fechas y horas
        interviniente.fechaNacimiento = dayjs(interviniente.fechaNacimiento).format('YYYY-MM-DD')

        //nose porque no anda

        const intData = await interntalAPI.post('/intervinientes/interviniente-create', interviniente)
 
        console.log(intData.data.id)

        /*
        const vicRel = await interntalAPI.post('/intervinientes/interviniente-victima-create', {
            ...victimaRelacion,
            idDenuncia,
            idInterviniente: intData.data.id
        })

        const denIntData = await interntalAPI.post('/intervinientes/interviniente-denuncia-create', {
            idDenuncia,
            idInterviniente: intData.data.id,
        })

        */

        res.status(200).json({
            message: 'Interviniente creado completo',
            id: queryResult.insertId
        })

    
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            showError(error.response.statusText + ' ' + error.request.path)
            res.status(error.response.status).json(error.response.data)
        }
        else {
            showError(error)
            httpErrorHandler(res, 500, "500 SERVER ERROR", false, error.message)
        }
    }
}

IntervinienteController.createInterviniente  = async (req, res) => {
    try {

        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)
        
        const query = `insert into interviniente (${keys.join(', ')},estado) values (${keys.map(key => "?").join(', ')},1)`;

        const queryResult = await queryHandler(query,values);


        
        res.status(200).json({
            message: 'Interviniente creado correctamente',
            id: queryResult.insertId
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Serve Error', false);
    }
}

IntervinienteController.createIntervinienteVictima  = async (req, res) => {
    try {
    
        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)
        
        const query = `insert into denuncia_victima (${keys.join(', ')},estado) values (${keys.map(key => "?").join(', ')},1)`;

        const queryResult = await queryHandler(query,values);

        res.status(200).json({
            message: 'Victima creado correctamente',
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Serve Error', false);
    }
}

IntervinienteController.createIntervinienteDenuncia = async(req, res) => {
    try{

        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)
        
        const query = `insert into interviniente_denuncia (${keys.join(', ')},estado) values (${keys.map(key => "?").join(', ')},1)`;

        const queryResult = await queryHandler(query,values);


        
        res.status(200).json({
            message: 'relacion interviniente-denuncia creada correctamente',
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Serve Error', false);
    }
}

//SUBIR FOTOS DNI INTERVINIENTE

IntervinienteController.uploadFile = async (req,res) => {
    try {
        
        const idDenuncia = req.params.id
        
        await Promise.all(req.files.map((file) => {
            const query = `INSERT INTO interviniente_dni (id_denuncia, nombre_original, nombre_archivo, fecha_archivo, estado) VALUES(?,?,?,NOW(),1)`
            return   queryHandler(query,[idDenuncia, file.originalname, file.filename])
        }))

        

        res.status(200).json({
            ok:true,
            message: "Files upload",
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

//---------------update intervininete en ver denuncia

IntervinienteController.updateInterviniente  = async (req, res) => {
    try {
    
        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)
        
        const { id } = req.params;

        console.log(data)
        
        const query = `UPDATE interviniente SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id = ${id}`;
       
        const queryResult = await queryHandler(query,values);

        res.status(200).json({
            message: 'Interviniente actualizado correctamente',
            id: queryResult.insertId
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Serve Error', false);
    }
}

IntervinienteController.updateIntervinienteVictima  = async (req, res) => {
    try {
    
        const data = matchedData(req)
        const keys = Object.keys(data).map(key => convertToSnakeCase(key))
        const values = Object.values(data)
        
        const query = `UPDATE denuncia_victima SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id = ${id}`;

        const queryResult = await queryHandler(query,values);

        res.status(200).json({
            message: 'relacion victima actualizado correctamente',
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res,500,'500 Serve Error', false);
    }
}

module.exports = IntervinienteController;