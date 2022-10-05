import express from 'express';
import CourseController from '../app/controllers/Course';
import Course from '../app/models/Course';
// import AuthService from '../app/services/AuthService';

const router = express.Router();
const courseController = new CourseController(Course);

router.get('/', (req, res) => courseController.get(req, res));

router.get('/:id', (req, res) => courseController.getById(req, res));

router.post('/', (req, res) => courseController.create(req, res));

router.put('/:id', (req, res) => courseController.update(req, res));

router.delete('/:id', (req, res) => courseController.delete(req, res));

export default router;
