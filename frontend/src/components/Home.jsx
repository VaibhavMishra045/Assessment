import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';

const Home = () => {
  const { user, setIsAuthorized, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/logout', {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      if (res.data.success) {
        setIsAuthorized(false);
        setUser(null);
        navigate('/login');
      } else {
        console.error('Logout failed with status:', res.status);
      }
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data.error : error.message);
    }
  };
  const exerciselist=["Shoulder","Elbow","Ankle","Hip","Knee","Wrist","Hands","Toes"];

  return (
    <div className="home-container">
      <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
        <div className="logo">MyAppLogo</div>
        <h1 className="heading">Arom Assessment</h1>
        <div className="hamburger" onClick={() => setNavbarActive(!navbarActive)}>
          ☰
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/changepassword')}>Change Password</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <section className="user-section">
        <h2>Patient Name: {user ? user.name : 'Guest'}</h2>
        <div className="cards-container">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="card"
              style={{ backgroundImage: `url(../public/fitness-${index + 1}.jpg)` }}
            >
              <div className="card-content">
                <h3 className="card-heading">{exerciselist[index]}</h3>
                <button className="assessment-button">Start Assessment</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

