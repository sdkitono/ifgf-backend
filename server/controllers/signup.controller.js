import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError from '../helpers/APIError';

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

function onboard(req, res) {
  return res.json({
    risk: req.body.risk
  });
}

function verifyToken(req, res) {
  return res.json({
    verificationToken: req.query.verificationToken
  });
}

export default { onboard, verifyToken };
