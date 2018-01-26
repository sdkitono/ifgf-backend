module.exports = (sequelize, DataTypes) => {
  const InvestmentFund = sequelize.define('InvestmentFund', {
    name: DataTypes.STRING,
    nav: DataTypes.DECIMAL(13, 4),
    url: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => {
        models.InvestmentFund.hasMany(models.UsersInvestmentFund, { as: 'UsersInvestmentFund', foreignKey: 'investment_fund_id' });
        //models.InvestmentFund.belongsToMany(models.User, { through: { model: models.UsersInvestmentFund, unique:true }, foreignKey: 'investment_fund_id', as: {singular: 'investorUser', plural: 'investorUsers'} });
      }
    }
  });
  return InvestmentFund;
};
