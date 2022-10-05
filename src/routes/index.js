import express from 'express';
import usersRoute from './users';
import coursesRoute from './courses';
import associateRoute from './associate';
import publicRoute from './public';

const router = express.Router();

router.use('/users', usersRoute);

router.use('/courses', coursesRoute);

router.use('/associate', associateRoute);

router.use('/public', publicRoute);

export default router;
