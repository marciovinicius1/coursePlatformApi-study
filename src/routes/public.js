import express from 'express';
import UserController from '../app/controllers/User';
import User from '../app/models/User';
import AuthService from '../app/services/AuthService';
import ResetPasswordService from '../app/services/ResetPasswordService';

const router = express.Router();
const userController = new UserController(
  User,
  AuthService,
  ResetPasswordService
);

router.post('/register', (req, res) => userController.create(req, res));

router.post('/auth', (req, res) => userController.authenticate(req, res));

router.post('/forgot-password', (req, res) =>
  userController.forgotPassword(req, res)
);

router.put('/reset-password/:id/:token', (req, res) =>
  userController.resetPassword(req, res)
);

export default router;
