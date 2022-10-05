import express from 'express';
import UserController from '../app/controllers/User';
import User from '../app/models/User';
import AuthService from '../app/services/AuthService';

const router = express.Router();
const userController = new UserController(User, AuthService);

router.get('/', (req, res) => userController.get(req, res));

router.get('/:id', (req, res) => userController.getById(req, res));

router.put('/:id', (req, res) => userController.update(req, res));

router.delete('/:id', (req, res) => userController.delete(req, res));

export default router;
