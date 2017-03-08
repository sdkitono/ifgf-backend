'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'InvestmentFunds',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING
        },
        nav: {
          type: Sequelize.DECIMAL(13, 4)
        },
        url: {
          type: Sequelize.STRING
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
