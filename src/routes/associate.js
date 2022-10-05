import express from 'express';
import AssociateController from '../app/controllers/Associate';
import Course from '../app/models/Course';
import User from '../app/models/User';
import AssociateService from '../app/services/AssociateService';

const router = express.Router();
const associateController = new AssociateController(
  User,
  Course,
  AssociateService
);

router.get('/:user_id', (req, res) => associateController.getById(req, res));

router.post('/', (req, res) => associateController.create(req, res));

router.delete('/', (req, res) => associateController.delete(req, res));

export default router;
