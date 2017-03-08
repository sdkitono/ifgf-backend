'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('InvestmentFunds', [{
      name: 'RHB LQ45',
      nav: 1258.86,
      url: 'http://www.bareksa.com/id/data/reksadana/1103/rhb-lq45-tracker'
    },
    {
      name: 'RHB Fixed Income Fund 2',
      nav: 997.16,
      url: 'http://www.bareksa.com/id/data/mutualfund/2281/rhb-fixed-income-fund-2'
    },
    {
      name: 'RHB Money Market Fund 5',
      nav: 1079.81,
      url: 'http://www.bareksa.com/id/data/mutualfund/2119/rhb-money-market-fund-5'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
