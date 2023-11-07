/**
 * Remove the extension from a file name
 * @param {string} fileName the name of the file
 * @returns {string} the name of the file without the extension
 */
const removeExtension = (fileName)=>{
    return fileName.split('.').shift();
}

module.exports = removeExtension;