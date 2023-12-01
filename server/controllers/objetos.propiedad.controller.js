const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
const { matchedData } = require('express-validator');
const showError = require('@utils/showError')

const ObjetosPropiedadController = {}


//crear objetos propiedad

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

//update objetos propiedad

ObjetosPropiedadController.updateTelefonos = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_telefonos SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_telefonos = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Telefono actualizado',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateAutomoviles = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_automoviles SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_automoviles = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Automovil actualizado',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateBicicletas = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_bicicletas SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_bicicletas = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Bicicleta actualizada',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateAutopartes = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_autopartes SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_autopartes = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Autoparte actualizada',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateCheques = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_cheques SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_cheques = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Cheque actualizado',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateDocumentacion = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_documentacion SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_documentacion = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Documentacion actualizado',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateOtro = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_otro SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_otro = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Otro objeto actualizado',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

ObjetosPropiedadController.updateTarjetas = async(req,res) => {
    try {

        const data = matchedData(req);
        const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
        const values = Object.values(data);
  
        const { id } = req.params;
  
        console.log(data)
        
        const query = `UPDATE denuncia_propiedad_tarjetas SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad_tarjetas = ${id}`;
        const resQuery = await queryHandler(query, values);
  
        res.status(200).json({
            ok: true,
            message: 'Tarjeta actualizada',
            id: resQuery.insertId,
        });

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}


module.exports = ObjetosPropiedadController