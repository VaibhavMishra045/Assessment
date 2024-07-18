import jwt from 'jsonwebtoken';
import { User} from '../models/User.js';
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Not authorized' });
  }
};
