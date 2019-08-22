import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
/**
 * This file checks whether a token is valid
 * the token might be included in headers.authorisation (bear <token>)
 *
 * It is used promisify to make possible we use a function that does not allow
 * to use await (it uses callback) - like - jwt.verify(params).then(...)
 * With promisify I can use await as it is below
 * A try catch is required once this method might return an error
 */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
};
