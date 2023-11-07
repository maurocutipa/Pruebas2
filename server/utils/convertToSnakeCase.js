/**
 * Convierte a snake case una cadena de texto
 * @param {string} name cadena de texto
 * @returns {string} cadena de texto en snake case
 */

const convertToSC = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/(\d)([a-zA-Z])/g, '$1_$2').replace(/([a-zA-Z])(\d)/g, '$1_$2').toLowerCase();
}


module.exports = convertToSC;