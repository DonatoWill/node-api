const filterModel = require("../models/filter");
const dbConnection = require("../config/dbConnection");

/* static carro service class */
class filtroService
{
	static retrieveCombustivel = (req, res, next) =>
	{
		dbConnection.query('SELECT * FROM tipo_combustivel ORDER BY descricao ASC', (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
    }
    
    static retrieveModelo = (req, res, next) =>
	{
		dbConnection.query('SELECT * FROM modelo ORDER BY descricao ASC', (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
    }
    
    static retrieveMarca = (req, res, next) =>
	{
		dbConnection.query('SELECT * FROM marca ORDER BY descricao ASC', (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
    }
    
    static retrieveCambio = (req, res, next) =>
	{
		dbConnection.query('SELECT * FROM cambio ORDER BY descricao ASC', (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 
	}

    static retrieveOpcional = (req, res, next) =>
	{
		dbConnection.query('SELECT * FROM opcional ORDER BY descricao ASC', (error, results) => {
			if (error) {
			  throw error
			}
			if(results){
				res.status(200).json(results.rows)
			}
		}) 	
    }
    

}

module.exports = filtroService;