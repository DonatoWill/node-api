var express = require('express');
var router = express.Router();
var FilterService = require('../services/service.filters');

router.get('/filtro/cambio', FilterService.retrieveCambio);

router.get('/filtro/combustivel', FilterService.retrieveCombustivel);

router.get('/filtro/marca', FilterService.retrieveMarca);

router.get('/filtro/modelo', FilterService.retrieveModelo);

router.get('/filtro/opcional', FilterService.retrieveOpcional);

module.exports = function (app) {
	app.use('/', router);
}