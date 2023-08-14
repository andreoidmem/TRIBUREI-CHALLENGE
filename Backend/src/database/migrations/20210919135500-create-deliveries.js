'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      peso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      }, numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
      },
      pais: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.NUMERIC(10,6),
      },
      longitude: {
        type: Sequelize.NUMERIC(10,6),
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('deliveries');

  }
};
