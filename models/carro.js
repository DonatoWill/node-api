class CarroModel {


	constructor(id, marca, modelo, ano, cambio, combustivel, status, quilometragem, valor)
	{
		this.id = id;
		this.marca = marca;
		this.modelo = modelo;
		this.ano = ano;
		this.cambio = cambio;
		this.combustivel = combustivel;
		this.status = status;
		this.quilometragem = quilometragem;
		this.valor = valor;
	}
}

module.exports = new CarroModel;