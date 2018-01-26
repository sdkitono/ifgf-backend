'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    let Promise = queryInterface.sequelize.Promise;
    return Promise.coroutine(function *(){
            // create tables
            yield Promise.all([
                queryInterface.createTable(
                    'UsersInvestmentFunds',
                    {
                        id: {
                          type: Sequelize.INTEGER,
                          primaryKey: true,
                          autoIncrement: true
                        },
                        quantity: {type: Sequelize.DECIMAL(13, 4)},
                        user_id: {type: Sequelize.INTEGER, primaryKey: true},
                        investment_fund_id: {type: Sequelize.INTEGER, primaryKey: true}
                    }
                )
            ]);
            // foreign keys
            yield Promise.all([
                queryInterface.sequelize.query('ALTER TABLE UsersInvestmentFunds ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES Users(id);'),
                queryInterface.sequelize.query('ALTER TABLE UsersInvestmentFunds ADD CONSTRAINT investment_fund_id FOREIGN KEY (investment_fund_id) REFERENCES InvestmentFunds(id);')
            ]);
            return true;
        })();
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
