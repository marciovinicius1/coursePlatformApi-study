import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import acl from 'express-acl';
// import { objectConfig, responseObject } from '../config/aclConfig';
import routes from './routes/index';
import authMiddleware from './middlewares/auth';

import './database';

acl.config({
  baseUrl: '/',
  path: './config',
  filename: 'nacl.json',
  defaultRole: 'admin'
});

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(['/users', '/courses', '/associate'], authMiddleware);
    this.server.use(acl.authorize.unless({ path: '/public' }));
  }

  routes() {
    this.server.use('/', routes);
  }
}

export default new App().server;
