import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(401).json({ error: 'User not found.' });

    const passwordMatched = await user.checkPassword(password);
    if (!passwordMatched)
      return res.status(401).json({ error: 'Invalid password.' });

    const { id, name } = user;

    /**
     * The jwt.sign needs
     * an id to link with the token that will be generated
     * secret that is the key secret of my app. (go to md5.org to create one)
     * and an object to tell how long it will be valid (@expiresIn)
     */
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
