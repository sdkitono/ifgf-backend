import winston from 'winston';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import MailgunHelper from '../helpers/MailgunHelper';
import { User } from '../models';

const saltRounds = 10;

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res) {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      const randomVar = randomstring.generate(16);
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        User.build({
          email: req.body.email,
          password: hash,
          verificationToken: randomVar
        }).save()
        .then((newUser) => {
          MailgunHelper.sendMailWithToken(randomVar, req.body.email, (error, body) => {
            console.log(body);
          });
          res.json(newUser);
        })
        .catch((error) => {
          res.json(error);
        });
      });
    }
  });
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

function onboardContactInfo(req, res, next) {
  // If we reach here that means uploading to s3 is complete
  // Able to get the key value property from req.body
  debugger;
  const parts = req.body.dateOfBirth.split('/');
  const dateOfBirth = new Date(parts[2], parts[1] - 1, parts[0]);
  const fileKey = req.file.key;
  const {
    addressLine1,
    city,
    fullName,
    identityNumber,
    stateOption,
    taxRegistrationNumber,
    zipCode,
    phoneNumber,
    religion,
    relationship,
    education,
    citizenship,
    motherName,
    emergencyContactName,
    emergencyContactNumber
  } = req.body;

  User.update(
    {
      addressLine1,
      dateOfBirth,
      city,
      fullName,
      identityNumber,
      stateOption,
      taxRegistrationNumber,
      zipCode,
      phoneNumber,
      religion,
      relationship,
      education,
      citizenship,
      motherName,
      emergencyContactName,
      emergencyContactNumber,
      fileKey
    },
    { where: { id: req.user.id } }
  )
  .then(savedUser => res.json(savedUser))
  .catch(e => next(e));
}

function onboardFinancialInfo(req, res, next) {
  const {
    employmentStatus,
    occupation,
    employer,
    employerAddress,
    employerPhoneNumber,
    householdIncome,
    yearEmployment,
    bankName,
    bankBranch,
    bankAccountNumber,
    bankAccountName
  } = req.body;

  User.update(
    {
      employmentStatus,
      occupation,
      employer,
      employerAddress,
      employerPhoneNumber,
      householdIncome,
      yearEmployment,
      bankName,
      bankBranch,
      bankAccountNumber,
      bankAccountName
    },
    { where: { id: req.user.id } }
  )
  .then(savedUser => res.json(savedUser))
  .catch(e => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove,
  onboardContactInfo,
  onboardFinancialInfo
};
