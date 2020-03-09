const carroModel = require("../models/model.carro");
let Validator = require('fastest-validator');


let carros = {};
let counter = 0;

/* create an instance of the validator */
let carroValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* carro validator shema */
const carroVSchema = {
		guid: {type: "string", min: 3},
		
		first_name: { type: "string", min: 1, max: 50, pattern: namePattern},
		last_name: { type: "string", min: 1, max: 50, pattern: namePattern},
		email: { type: "email", max: 75 },
		zipcode: { type: "string", max: 5, pattern: zipCodePattern},

		password: { type: "string", min: 2, max: 50, pattern: passwordPattern}
	};

/* static carro service class */
class carroService
{
	static create(data)
	{
		var vres = carroValidator.validate(data, carroVSchema);
		
		/* validation failed */
		if(!(vres === true))
		{
			let errors = {}, item;

			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}
			
			throw {
			    name: "ValidationError",
			    message: errors
			};
		}

		let carro = new carroModel(data.first_name, data.last_name, data.email, data.zipcode, data.password);

		carro.uid = 'c' + counter++;

		carros[carro.uid] = carro;

		return carro;
	}

	static retrieve(uid)
	{
		if(carros[uid] != null)
		{
			return carros[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a carro by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(carros[uid] != null)
		{
			const carro = carros[uid];
			
			Object.assign(carro, data);
		}
		else
		{
			throw new Error('Unable to retrieve a carro by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(carros[uid] != null)
		{
			delete carros[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a carro by (uid:'+ cuid +')');
		}
	}
}

module.exports = carroService;