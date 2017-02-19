'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
    'Users',
    'docusignStatus',
    {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'Unsigned'
    })
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
