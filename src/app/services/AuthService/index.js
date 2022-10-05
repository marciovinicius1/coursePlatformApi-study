import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

// Verifica se o usuário existe, compara as senhas e gera token JWT para autenticação.

class Auth {
  constructor(User) {
    this.User = User;
  }

  async authenticate(data) {
    const user = await this.User.findOne({ where: { email: data.email } });

    const hashPassword = bcrypt.hashSync(data.password, 10);

    if (!user || bcrypt.compareSync(hashPassword, user.password)) {
      console.log(data.password);
      return false;
    }

    return user;
  }

  static generateToken(payload) {
    return jwt.sign(payload, config.get('auth.key'), {
      expiresIn: config.get('auth.tokenExpiresIn')
    });
  }
}

export default Auth;
