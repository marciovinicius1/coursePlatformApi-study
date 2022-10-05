class Associate {
  constructor(User, Course) {
    this.User = User;
    this.Course = Course;
  }

  async getAllCourseById(user_id) {
    const user = await this.User.scope('withoutPassword').findByPk(user_id, {
      include: { association: 'courses' }
    });

    if (!user) {
      return { Error: 'User not found' };
    }

    return user;
  }

  async accomplishCourse(user_id, course_id) {
    const user = await this.User.findByPk(user_id);
    const course = await this.Course.findByPk(course_id);

    if (!user) {
      return { Error: 'User not found' };
    }
    if (!course) {
      return { Error: 'Course not found' };
    }

    user.addCourse(course);
    return user;
  }

  async removeCourse(user_id, course_id) {
    const user = await this.User.findByPk(user_id);
    const course = await this.Course.findByPk(course_id);

    if (!user) {
      return { Error: 'User not found' };
    }
    if (!course) {
      return { Error: 'Course not found' };
    }

    user.removeCourse(course);
  }
}

export default Associate;
