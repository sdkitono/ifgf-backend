import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import signupCtrl from '../controllers/signup.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/onboard')
  /** PUT /api/users/:userId - Update user */
  .post(signupCtrl.onboard);

router.route('/verifyEmail')
  /** PUT /api/users/:userId - Update user */
  .get(signupCtrl.verifyToken);

export default router;
