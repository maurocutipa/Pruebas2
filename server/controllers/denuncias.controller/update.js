const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const { formatDateHour } = require('@utils/formatDate');
const showError = require('@utils/showError');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
const { matchedData } = require('express-validator');



const UpdateController = {};

UpdateController.ratificarDenuncia = async (req, res) => {
  const { id } = req.params;

  const [fecha, hora] = formatDateHour(new Date()).split(' ');

  try {
    let query = `SELECT ratificacion FROM denuncia WHERE id_denuncia = ?`;
    let [data] = await queryHandler(query, [id]);
    if (data.ratificacion === 'SI') {
      return res
        .status(400)
        .json({ message: `Denuncia con el id: ${id} ya fue ratificada` });
    }

    query = `
      UPDATE
        denuncia
      SET 
        fecha_ratificacion = ?,
        hora_ratificacion = ?,
        ratificacion = 'SI',
        id_user_ratificacion = ?

      WHERE id_denuncia = ?`;

    response = await queryHandler(query, [fecha, hora, req.idUsuario, id]);

    if (response.changedRows === 0) {
      return res
        .status(400)
        .json({ message: `Denuncia con el id: ${id} no fue ratificada` });
    }

    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

UpdateController.updateDenunciaGeneral = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};

UpdateController.updateDenunciaGenero = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_violencia_genero SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_violencia_genero = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Genero actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaFamiliar = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_violencia_familiar SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_violencia_familiar = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Familiar actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};

UpdateController.updateDenunciaAbigeato = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_abigeato SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_abigeato = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Abigeato actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};

UpdateController.updateDenunciaAbigeatoDetalles = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_abigeato_detalles SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_abigeato_detalles = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'detalles de abigeato actualizados',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};

UpdateController.updateDenunciaPropiedad= async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_propiedad SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_propiedad = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Propiedad actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaDelitosPersonas = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_delitos_personas SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_delitos_personas = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Personas actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaIncidenteVial = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_incidentes_viales SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_incidentes_viales = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Incidente Vial actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaDelitosSexuales = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_delitos_sexuales SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_delitos_sexuales = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Delistos Sexuales actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaIncidenteVialVehiculo = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_incidentes_viales_vehiculos SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_incidentes_viales_vehiculos = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Vehiculo actualizado',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaDanos = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_danos SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_danos = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Daños actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaMaltratoAnimal = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_maltrato_animal SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_maltrato_animal = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Maltrato Animal actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};


UpdateController.updateDenunciaBusquedaPersona = async (req, res) => {
  try {

      const data = matchedData(req);
      const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
      const values = Object.values(data);

      const { id } = req.params;

      console.log(data)
      
      const query = `UPDATE denuncia_busqueda_persona SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id_denuncia_busqueda_persona = ${id}`;
      const resQuery = await queryHandler(query, values);

      res.status(200).json({
          ok: true,
          message: 'Denuncia Busqueda Persona actualizada',
          id: resQuery.insertId,
      });

  } catch (error) {
      showError(error);
      httpErrorHandler(res);
  }
};

module.exports = UpdateController;
