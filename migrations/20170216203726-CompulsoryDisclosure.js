'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'relationshipWithRHB',
      Sequelize.BOOLEAN
    ),
    queryInterface.addColumn(
      'Users',
      'relationshipWithRHBExtension',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'Users',
      'memberOfFinancialCompany',
      Sequelize.BOOLEAN
    ),
    queryInterface.addColumn(
      'Users',
      'memberOfFinancialCompanyExtension',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'Users',
      'memberOfPublicCorporation',
      Sequelize.BOOLEAN
    ),
    queryInterface.addColumn(
      'Users',
      'memberOfPublicCorporationExtension',
      Sequelize.STRING
    ),
    queryInterface.changeColumn(
    'Users',
    'yearEmployment',
    {
      type: Sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: 0.0
    }
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
