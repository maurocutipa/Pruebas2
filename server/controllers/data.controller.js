const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');

const getDelitos = async (req, res) => {
  try {
    query = `
      SELECT 
        id_delito as idDelito,
        nombre
      FROM delitos`;

    const delitos = await queryHandler(query);

    res.status(200).json({
      message: 'ok',
      data: { delitos },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = { getDelitos };
