class AssociateController {
  constructor(User, Course, AssociateService) {
    this.User = User;
    this.Course = Course;
    this.AssociateService = AssociateService;
  }

  async getById(req, res) {
    const associateService = new this.AssociateService(this.User, this.Course);
    const { user_id } = req.params;

    try {
      const user = await associateService.getAllCourseById(user_id);

      if (user.err) {
        return res.status(400).send(user.err);
      }

      res.json(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const associateService = new this.AssociateService(this.User, this.Course);
    const { user_id, course_id } = req.body;

    try {
      const user = await associateService.accomplishCourse(user_id, course_id);
      res.status(201).send(user);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async delete(req, res) {
    const associateService = new this.AssociateService(this.User, this.Course);
    const { user_id, course_id } = req.body;
    try {
      await associateService.removeCourse(user_id, course_id);
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default AssociateController;
