const express = require('express');
const actorsController = require('./actorsController');

const actorsRouter = express.Router();

actorsRouter.get('/',actorsController.getAllActors);
actorsRouter.get('/:id',actorsController.getInformation);

module.exports = actorsRouter;