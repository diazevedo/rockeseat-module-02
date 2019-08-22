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

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    /**
     * Verified if the user wants to chenge their email so it we need to know
     * if the new one is unique
     */
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists)
        return res
          .status(400)
          .json({ error: 'Sorry, this user already exists.' });
    }

    /**
     * Checking if the password is correct
     * Only if the oldPassword is informed that means that he wants to change password
     *
     */
    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Invalid password.' });

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
