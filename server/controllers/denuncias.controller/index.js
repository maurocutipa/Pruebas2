const CreateController = require('./create')
const GetController = require('./get')
const DeleteController = require('./delete')

const DenunciasController = {
  ...CreateController,
  ...GetController,
  ...DeleteController
};

module.exports = DenunciasController;
