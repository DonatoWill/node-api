var express = require('express');
var router = express.Router();
var CarroService = require('../services/service.carro');

router.get('/', CarroService.retrieveAll);

router.post('/', CarroService.create);

router.get('/:id', CarroService.retrieve);

router.put('/:id', CarroService.update);

router.delete('/:id', CarroService.delete);

module.exports = function (app) {
	app.use('/', router);
}
