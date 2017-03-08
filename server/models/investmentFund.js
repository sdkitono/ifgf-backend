module.exports = (sequelize, DataTypes) => {
  const InvestmentFund = sequelize.define('InvestmentFund', {
    name: DataTypes.STRING,
    nav: DataTypes.DECIMAL(13, 4),
    url: DataTypes.STRING
  }, {
    timestamps: false
  });
  return InvestmentFund;
};
