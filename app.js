var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consign = require('consign');

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);
	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);
	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

consign()
	.include('./routes')
	.then('./config/dbConnection.js') 
	.then('./models')
	.then('./repository')
	.into(app);

//app.use('/api/v1/carro', carro);
//app.use('/api/v1/generate_uid', generate_uid);
app.listen(8081, function(){
	console.log('Servidor online');
})
module.exports = app;
