import jwt from 'jsonwebtoken';
import config from 'config';

class ResetPassword {
  static validate(token) {
    return jwt.verify(token, config.get('auth.key'), (err, decoded) => {
      if (err) {
        return { error: 'Token Invalid' };
      }
      return decoded;
    });
  }
}

export default ResetPassword;
