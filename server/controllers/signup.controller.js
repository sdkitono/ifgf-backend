import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError from '../helpers/APIError';
import { User } from '../models';

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
  User.findOne({ where: { verificationToken: req.query.verificationToken } }).then((user) => {
    if (user) {
      user.verificationToken = null;
      user.isVerified = true;
      user
      .save()
      .then(updatedUser =>
        res.json({ updatedUser })
      )
      .catch((error) => {
        console.log(error);
        res.json({
          success: false
        });
      });
    } else {
      return res.json({
        success: false
      });
    }
  });
}

export default { onboard, verifyToken };
