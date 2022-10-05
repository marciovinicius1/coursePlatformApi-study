import jwt from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  jwt.verify(token, config.get('auth.key'), (err, decoded) => {
    if (err) {
      res.status(401).send({ error: 'Token Invalid' });
    }

    req.decoded = decoded;
    next();
  });
};
