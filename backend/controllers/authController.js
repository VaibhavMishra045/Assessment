import {User} from '../models/User.js';
import dotenv from "dotenv";
dotenv.config();


// Error handling helper
const handleError = (res, error) => res.status(500).json({ success: false, error: error.message });


const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Set httpOnly to true
      sameSite: 'None', // Allows cross-origin requests
      secure: true, // Ensures cookie is sent only over HTTPS
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };


export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    handleError(res, error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    sendToken(user, 200, res);
  } catch (error) {
    handleError(res, error);
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'New password and confirm password do not match' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Old password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const logout = (req, res) => {
    res.cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};
