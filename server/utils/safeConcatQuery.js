const {escape, escapeId} = require('mysql')
/**
 * Esta funcion sanitiza un string para luego sumarselo a la query en cuestion, para evitar
 * posibles SQL Injections
 * @param {string} query - SQL query en la que se le agregara el valor
 * @param {string} value - Valor que sera sanitizado para agregar a la query
 * @param {boolean} escapeIdOn - Indica si el valor se lo usa como identificador SQL, por defecto es falso
 * @returns Una SQL query que esta sanitizada
 */
const safeConcatQuery = (query, value, escapeIdOn = false) => {
    return `${query} ${escapeIdOn? escapeId(value):escape(value)}`
}

module.exports = safeConcatQuery