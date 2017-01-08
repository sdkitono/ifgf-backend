import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError from '../helpers/APIError';
import { User } from '../models';
const config = require('../../config/env');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          next();
        } else {
          next(err);
        }
      });
    } else {
      next(err);
    }
  });
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
