import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists)
      return res
        .status(400)
        .json({ error: 'Sorry, this user already exists.' });

    const user = await User.create(req.body);
    const { id, name, email, provider } = user;
    return res.json({ id, name, email, provider });
  }

  async show(req, res) {
    const users = { res: 'Coming soon' };

    return res.json(users);
  }
}

export default new UserController();
