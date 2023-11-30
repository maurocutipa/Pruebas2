const GetController = require('./get');
const CreateController = require('./create');

const DenunciasController = {
  ...GetController,
  ...CreateController
};

module.exports = DenunciasController;
