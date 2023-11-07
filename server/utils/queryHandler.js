const {getConnection} = require('../config/database')

/**
 * Ejecuta una query SQL
 * @param {*} query SQL query a ejecutar
 * @param {*} values Valores a remplazar en la query (?)
 * @returns 
 */
const queryHandler = async (query,values = []) => {

    //new connection
    let connection = await getConnection()

    return new Promise((resolve,reject) => {
        connection.query(query,values,(error,results,fields) => {
            if(error){
                reject(error)
                return
            }
            
            resolve(results)
            
            //close db connection
            connection.end((err) => {
                if(err){
                    reject(err)
                    return
                }
                //console.log("Connection closed")
            })
        })
        
    })
}

module.exports = queryHandler