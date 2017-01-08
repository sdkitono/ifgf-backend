import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import APIError from '../helpers/APIError';

const config = require('../../config/env');

const TOKENTIME = 120 * 60; // in seconds

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  const apiError = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  passport.authenticate('local',
    {
      session: false,
      scope: []
    },
   (err, user) => {
     if (err) { return next(apiError); }
     if (!user) { return next(apiError); }
     const token = jwt.sign({
       id: user.id,
     }, config.jwtSecret, {
       expiresIn: TOKENTIME
     });
     const copyUser = JSON.parse(JSON.stringify(user));
     copyUser.risk = 'medium';
     return res.status(200).json({
       user: copyUser,
       token
     });
   })(req, res, next);
}

function logout(req, res) {
  res.json({
    success: 'true'
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, logout, getRandomNumber };
