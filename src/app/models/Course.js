import { Model, DataTypes } from 'sequelize';

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'courses'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'course_id',
      through: 'course_user',
      as: 'users'
    });
  }
}

export default Course;
