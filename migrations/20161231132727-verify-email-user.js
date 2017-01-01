'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'verificationToken',
      Sequelize.STRING(16)
    ),
    queryInterface.addColumn(
      'Users',
      'isVerified',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn({
      tableName: 'Users'
    }, 'verificationToken'),
    queryInterface.removeColumn({
      tableName: 'Users'
    }, 'isVerified')
  }
};
