import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap
const TOKENTIME = 120 * 60; // in seconds

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), passport.authenticate(
    'local', {
      session: false,
      scope: []
    }), serialize, generateToken, respond);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

function serialize(req, res, next) {
  /*
  db.updateOrCreate(req.user, function(err, user) {
    if (err) {
      return next(err);
    }
    // we store information needed in token in req.user again
    req.user = {
      id: user.id
    };
    next();
  });
  */
  next();
}

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, config.jwtSecret, {
    expiresIn: TOKENTIME
  });
  next();
}

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

export default router;
