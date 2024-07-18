import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../main';


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthorized } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (!isAuthorized) {
      toast.error("You need to be logged in to change your password");
      navigate('/login');
      return;
    }

    try {
      const res = await axios.put('/api/auth/changepassword', { oldPassword, newPassword, confirmPassword });
      if (res.data.success) {
        toast.success("Password changed successfully");
        navigate('/home'); // Redirect to home page after successful password change
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;

