'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'employmentStatus',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'employer',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'employerAddress',
      Sequelize.STRING(100)
    ),
    queryInterface.addColumn(
      'Users',
      'employerPhoneNumber',
      Sequelize.STRING(20)
    ),
    queryInterface.addColumn(
      'Users',
      'householdIncome',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'Users',
      'yearEmployment',
      Sequelize.STRING(5)
    ),
    queryInterface.addColumn(
      'Users',
      'religion',
      Sequelize.STRING(20)
    ),
    queryInterface.addColumn(
      'Users',
      'relationship',
      Sequelize.STRING(20)
    ),
    queryInterface.addColumn(
      'Users',
      'education',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'citizenship',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'motherName',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'emergencyContactname',
      Sequelize.STRING(50)
    ),
    queryInterface.addColumn(
      'Users',
      'emergencyContactNumber',
      Sequelize.STRING(20)
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
