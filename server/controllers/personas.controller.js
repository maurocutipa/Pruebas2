const httpErrorHandler = require("@utils/httpErrorHandler");
const queryHandler = require("@utils/queryHandler");
const safeConcatQuery = require("@utils/safeConcatQuery");
const showError = require("@utils/showError");

const PersonasController = {};

PersonasController.getGrupos = async (req, res) => {
  try {
    let query =
      "SELECT id_notificar_grupos as id, nombre FROM mpa.notificar_grupos where estado = 1;";
    const data = await queryHandler(query);

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

PersonasController.getPersonas = async (req, res) => {
  try {
    const { limit, offset } = req.body;

    if (!limit || offset === undefined || offset === null) {
      throw new Error("Faltan parametros");
    }

    let query =
      "SELECT distinct mail, nombre FROM notificar_grupos_listado WHERE estado = 1 ORDER BY nombre LIMIT ? OFFSET ?";

    let data = await queryHandler(query, [limit, offset]);

    data = [{ nombre: "PERSONAL EXTERNO", mail: "" }, ...data];

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

module.exports = PersonasController;
