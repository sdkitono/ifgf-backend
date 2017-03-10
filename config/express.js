import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import passport from 'passport';
import bcrypt from 'bcrypt';
import later from 'later';
import numeral from 'numeral';
import scrapeIt from 'scrape-it';
import { Strategy as LocalStrategy } from 'passport-local';
import winstonInstance from './winston';
import routes from '../server/routes/index.route';
import config from './env';
import APIError from '../server/helpers/APIError';
import { User, InvestmentFund } from '../server/models';


const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// Setting up passport
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (username, password, done) => {
    User.findOne({ where: { email: username } }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      } else {
        done(null, false);
      }
    });
  }
));

app.use(passport.initialize());

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

// function to execute
function updateInvestmendFund() {
  InvestmentFund.findAll().then((investmentFundArray) => {
    investmentFundArray.forEach((investmentFund) => {
      console.log('investment fund scrapping', investmentFund);
      scrapeIt(investmentFund.url, {
        value: 'body > div.bodywrap.clearfix > section.bodybase > div.grid.w750.fl.profilereksadana > div:nth-child(7) > div.fl.grid.w250 > div > span.fS40'
      }).then((page) => {
        const numberSplit = page.value.split(',');
        const concatNumber = `${numberSplit[0].replace('.', ',')}.${numberSplit[1]}`;
        const nav = numeral(concatNumber).value();
        InvestmentFund.update(
          {
            nav,
          },
          { where: { id: investmentFund.id } }
        )
        .then(fund => console.log('success saving investment fund', fund))
        .catch(e => console.log('error updating investment fund', e));
      });
    });
  });
}

// will fire every 5 minutes
const textSched = later.parse.text('at 2:00 am');
//const textSched = later.parse.text('every 2 mins');

// execute logTime for each successive occurrence of the text schedule
const timer2 = later.setInterval(updateInvestmendFund, textSched);

export default app;
