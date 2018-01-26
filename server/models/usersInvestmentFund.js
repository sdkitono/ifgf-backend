module.exports = (sequelize, DataTypes) => {
  const UsersInvestmentFund = sequelize.define('UsersInvestmentFund', {
    quantity: DataTypes.DECIMAL(13, 4)
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => {
        models.UsersInvestmentFund.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        models.UsersInvestmentFund.belongsTo(models.InvestmentFund, { as: 'investment', foreignKey: 'investment_fund_id' });
      }
    }
  });
  return UsersInvestmentFund;
};
