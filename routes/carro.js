var express = require('express');
var router = express.Router();
var CarroService = require('../services/service.carro');

/* GET carro listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Invalid carro UID."});
});

/* adds a new carro to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const carro = await CarroService.create(body);

		if(body.guid != null)
		{
			carro.guid = body.guid;
		}

		res.cookie('guid', carro.guid, { maxAge: 900000, httpOnly: true });

		// created the carro! 
		return res.status(201).json({ carro: carro });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* retrieves a carro by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const carro = await CarroService.retrieve(req.params.id);

		return res.json({ carro: carro });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the carro by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const carro = await CarroService.update(req.params.id, req.body);

		return res.json({ carro: carro });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the carro from the carro list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const carro = await CarroService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;
