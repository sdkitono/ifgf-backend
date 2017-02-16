'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'bank',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'bankBranch',
      Sequelize.STRING(100)
    ),
    queryInterface.addColumn(
      'Users',
      'bankAccountNumber',
      Sequelize.STRING(8)
    ),
    queryInterface.addColumn(
      'Users',
      'bankAccountName',
      Sequelize.STRING(100)
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
