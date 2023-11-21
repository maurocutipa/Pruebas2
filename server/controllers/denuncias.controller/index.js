const CreateController = require('./create');
const GetController = require('./get');
const DeleteController = require('./delete');
const UpdateController = require('./update');

const DenunciasController = {
  ...CreateController,
  ...GetController,
  ...DeleteController,
  ...UpdateController,
};

module.exports = DenunciasController;
