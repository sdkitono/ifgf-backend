import { User, InvestmentFund, UsersInvestmentFund } from '../models';

function setInvestmentFund(req, res, next) {
  const { amountInvested, investmentFundId } = req.body;

  UsersInvestmentFund.findOrCreate({
    where: { user_id: req.user.id, investment_fund_id: investmentFundId },
    include: [{ model: InvestmentFund, as: 'investment' }]
  })
  .spread((userInvestmentFund, created) => {
    console.log(JSON.stringify(userInvestmentFund));
    if (created) {
      InvestmentFund.findOne({
        id: investmentFundId
      }).then((investmentFund) => {
        userInvestmentFund.quantity = amountInvested / investmentFund.nav;
        userInvestmentFund.save().then(() => {
          res.json({ status: 'OK' });
        });
      });
    } else {
      userInvestmentFund.quantity = amountInvested / userInvestmentFund.investment.nav;
      userInvestmentFund.save().then(() => {
        res.json({ status: 'OK' });
      });
    }
  });
}

export default {
  setInvestmentFund
};
