/**
 *  Load environment variables depending on the NODE_ENV [`production`,`development`,`local`]
 *  @returns {void} 
 */
const loadEnvironment = () => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development')
        require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
    else require('dotenv').config();
}

module.exports = loadEnvironment;