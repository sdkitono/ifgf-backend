import express from 'express';
import expressJwt from 'express-jwt';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import signupRoutes from './signup.route';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/users', expressJwt({ secret: config.jwtSecret }), userRoutes);
router.use('/auth', authRoutes);
router.use('/signup', signupRoutes);

export default router;
