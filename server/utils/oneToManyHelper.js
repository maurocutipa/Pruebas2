const { interntalAPI } = require('@config/http')

/**
 * Crea registros de tablas que sean 1:N,
 * @param {*} endpoint Endpoint del server al cual va a llamar (unicamente endpoints que reciban arreglos)
 * @param {*} values Lista de los objetos a crear
 * @param {*} idRef Id de la tabla referencia  
 * @param {*} field Nombre del campo del id de referencia valido para las validaciones (check validaciones antes)
 * @returns 
 */
const oneToManyHelper = async (endpoint, values, idRef, field) => {

    try {
        if (values && idRef && field) {
            const res = await interntalAPI.post(endpoint, values.map(val => ({
                ...val,
                [field]: idRef
            })))
            return true
        }
        else throw new Error('Error')
    } catch (error) {
        return false
    }
}


module.exports = oneToManyHelper