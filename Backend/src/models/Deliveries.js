const { Model, DataTypes } = require('sequelize');

class Deliveries extends Model {
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
      peso: DataTypes.NUMBER,
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      complemento: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      pais: DataTypes.STRING,
      latitude: DataTypes.NUMBER,
      longitude: DataTypes.NUMBER,
    }, {
      timestamps: false,
      sequelize: connection
    })
  }
}

module.exports = Deliveries