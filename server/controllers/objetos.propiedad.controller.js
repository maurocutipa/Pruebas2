const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
const { matchedData } = require('express-validator');
const showError = require('@utils/showError')

const ObjetosPropiedadController = {}


ObjetosPropiedadController.createTelefonos = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(telefono => {

            const keys = Object.keys(telefono).map(key => convertToSnakeCase(key))
            const values = Object.values(telefono)
        
            const query = `insert into denuncia_propiedad_telefonos (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Telefonos cargados",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.createAutomoviles = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(automovil => {

            const keys = Object.keys(automovil).map(key => convertToSnakeCase(key))
            const values = Object.values(automovil)
        
            const query = `insert into denuncia_propiedad_automoviles (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Automoviles cargados",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}


ObjetosPropiedadController.createBicicletas = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(bicicleta => {

            const keys = Object.keys(bicicleta).map(key => convertToSnakeCase(key))
            const values = Object.values(bicicleta)
        
            const query = `insert into denuncia_propiedad_bicicletas (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Bicicletas cargadas",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.createAutopartes = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(autoparte => {

            const keys = Object.keys(autoparte).map(key => convertToSnakeCase(key))
            const values = Object.values(autoparte)
        
            const query = `insert into denuncia_propiedad_autopartes (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Autopartes cargadas",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.createCheques = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(cheque => {

            const keys = Object.keys(cheque).map(key => convertToSnakeCase(key))
            const values = Object.values(cheque)
        
            const query = `insert into denuncia_propiedad_cheques (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Cheques cargados",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.createDocumentacion = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(documentacion => {

            const keys = Object.keys(documentacion).map(key => convertToSnakeCase(key))
            const values = Object.values(documentacion)
        
            const query = `insert into denuncia_propiedad_documentacion (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Documentacion cargada",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.createOtro = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(otro => {

            const keys = Object.keys(otro).map(key => convertToSnakeCase(key))
            const values = Object.values(otro)
        
            const query = `insert into denuncia_propiedad_otro (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Otros objetos cargados cargados",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.createTarjetas = async(req,res) => {
    try {

        const data = matchedData(req)['']

        const resQueries = await Promise.all(data.map(tarjeta => {

            const keys = Object.keys(tarjeta).map(key => convertToSnakeCase(key))
            const values = Object.values(tarjeta)
        
            const query = `insert into denuncia_propiedad_tarjetas (${keys.join(', ')}) values (${keys.map(key => "?").join(', ')})`

            return queryHandler(query,values)
        }))

        res.status(200).json({
            ok:true,
            message: "Tarjetas cargadas",
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}



module.exports = ObjetosPropiedadController