class CourseController {
  constructor(Course) {
    this.Course = Course;
  }

  async get(req, res) {
    try {
      const courses = await this.Course.findAll();
      res.json(courses);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const course = await this.Course.findOne({ where: { id } });

      if (!course) {
        res.status(401).send({ Error: 'Course not found' });
      }

      res.json(course);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const { name } = req.body;

    try {
      await this.Course.create({ name });
      res.status(201).send(name);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const course_exists = await this.Course.findOne({ where: { id } });

      if (!course_exists) {
        return res.status(401).send({ Error: 'Course not found' });
      }

      const course = await this.Course.update({ name }, { where: { id } });

      return res.status(204).send(course);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const course_exists = await this.Course.findOne({ where: { id } });

    if (!course_exists) {
      return res.status(401).send({ Error: 'Course not found' });
    }

    try {
      await this.Course.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default CourseController;
