const carroModel = require("../models/carro");
let Validator = require('fastest-validator');
const dbConnection = require("../config/dbConnection");

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
	static create = (req, res, next) =>
	{
		let param = Object.values(req.body);
		dbConnection.query('INSERT INTO public.veiculo('+
			'id, id_marca, id_modelo, ano, valor, quilometragem, id_cambio, id_combustivel, id_carroceria, id_status, dt_criacao, titulo)'+
			'VALUES (NEXTVAL(\'seq_veiculo\'), $1, $2, $3, $4, $5, $6, $7, $8, $9, current_date, $10)', param, (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
	}

	static retrieve = (req, res, next) =>
	{
		console.log(req.params.id)
		dbConnection.query('SELECT * FROM veiculo WHERE id = $1', [req.params.id], (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
	}

	static retrieveAll = (req, res, next) =>
	{
		dbConnection.query('SELECT * FROM veiculo ORDER BY id ASC', (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
	}

	static update = (req, res, next) =>
	{
		let param = Object.values(req.body);
		dbConnection.query('UPDATE veiculo SET id_marca=$1, id_modelo=$2, ano=$3,'+
							'valor=$4, quilometragem=$5, id_cambio=$6, id_combustivel=$7,'+
							'id_carroceria=$8, id_status=$9, titulo=$10 WHERE id=$11', param, (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
	}

	static delete = (req, res, next) =>
	{
		const id = parseInt(request.params.id)
		dbConnection.query('DELETE FROM veiculo WHERE id = $1', [id], (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
	}
}

module.exports = carroService;