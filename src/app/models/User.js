import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const VALIDATE_PASSWORD = value => {
  if (value.length <= 7) {
    throw new Error('Your password cannot be less than 8 digits!');
  }
};

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          validate: { isEmail: { Error: 'Email is not valid.' } }
        },
        zip: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        password: {
          type: DataTypes.STRING,
          validate: {
            VALIDATE_PASSWORD
          },
          role: DataTypes.STRING
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'users'
      }
    );

    this.beforeCreate(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    });

    this.beforeUpdate(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    });

    this.beforeSave(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    });

    this.addScope('withoutPassword', { attributes: { exclude: ['password'] } });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Course, {
      foreignKey: 'user_id',
      through: 'course_user',
      as: 'courses'
    });
  }
}

export default User;
