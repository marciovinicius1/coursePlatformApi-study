class UserController {
  constructor(User, AuthService, ResetPasswordService) {
    this.User = User;
    this.AuthService = AuthService;
    this.ResetPasswordService = ResetPasswordService;
  }

  async get(req, res) {
    try {
      const users = await this.User.scope('withoutPassword').findAll();
      res.json(users);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await this.User.scope('withoutPassword').findOne({
        where: { id }
      });
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const data = req.body;
    const { email } = req.body;

    try {
      const user_exsists = await this.User.findOne({
        where: { email }
      });

      if (user_exsists) {
        res.status(422).json({ error: 'Email has already been used' });
      }

      await this.User.create(data);
      res.status(201).send(data);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.User.update(data, { where: { id }, individualHooks: true });
      return res.status(204).send();
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async delete(req, res) {
    const {
      params: { id }
    } = req;

    try {
      await this.User.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async authenticate(req, res) {
    try {
      const authService = new this.AuthService(this.User);
      const user = await authService.authenticate(req.body);
      if (!user) {
        return res.status(401);
      }

      const token = this.AuthService.generateToken({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      });

      return res.send({ user, token });
    } catch (err) {
      return res.status(401).send({ error: 'Authentication failed' });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await this.User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      const token = this.AuthService.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });

      const link = `http://localhost:3333/reset-password/${user.id}/${token}`;

      return res.send({
        message: 'Password reset link has been sent to your email!',
        link
      });
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Error on forgot password, please try again' });
    }
  }

  async resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const decoded = this.ResetPasswordService.validate(token);
      const { id } = decoded;
      const user = await this.User.findByPk(id);

      if (decoded.error) {
        res.status(400).send({ error: 'Invalid Token, try again later.' });
      }

      if (!decoded.email === user.email) {
        res.status(400).send({ error: 'Invalid Token, try again later.' });
      }

      await this.User.update(
        { password },
        { where: { id }, individualHooks: true }
      );

      res.status(204).send({
        decoded,
        message: 'Token Validated! Update has been success.'
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default UserController;
