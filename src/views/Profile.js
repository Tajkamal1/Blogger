import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';
import './Profile1.css';

function Profile() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    profilePicture: null, // Set initial profilePicture to null
  });

  const [editMode, setEditMode] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post('http://localhost:5000/api/update-profile-picture', {
          email: userEmail,
          profilePicture: base64String,
        });

        console.log('Profile picture update successful:', response.data);
        setMessage('Profile picture uploaded');
        setTimeout(() => setMessage(''), 5000);
        setTimeout(() => window.location.reload(), 5000);
      } catch (error) {
        console.error('Profile picture update failed:', error.message);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { userEmail, logout } = useUser();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!userEmail) {
          console.error('User email is empty.');
          return;
        }

        const userDetailsResponse = await axios.get(`http://localhost:5000/api/user/${userEmail}`);

        if (userDetailsResponse.status === 200) {
          setUserDetails(userDetailsResponse.data);
        } else {
          console.error(`Failed to fetch user details for user with email ${userEmail}`);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userEmail) {
      fetchUserDetails();
    }
  }, [userEmail]);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  const handleToggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
    setNewFullName(userDetails.fullName);
    setNewEmail(userDetails.email);
  };

  const handleFullNameChange = (e) => {
    setNewFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSave = async () => {
    try {
      if (newFullName !== userDetails.fullName) {
        const responseFullName = await axios.post('http://localhost:5000/api/update-full-name', {
          email: userEmail,
          fullName: newFullName,
        });

        console.log('Full name update successful:', responseFullName.data);
        setMessage('Full name updated');
        setUserDetails((prevState) => ({
          ...prevState,
          fullName: newFullName,
        }));
      }

      if (newEmail !== userDetails.email) {
        const responseEmail = await axios.post('http://localhost:5000/api/update-email', {
          email: userEmail,
          newEmail: newEmail,
        });

        console.log('Email update successful:', responseEmail.data);
        setMessage('Email updated');
        setUserDetails((prevState) => ({
          ...prevState,
          email: newEmail,
        }));
      }

      setEditMode(false);
      setMessage('');
    } catch (error) {
      console.error('Update failed:', error.message);
    }
  };

  return (
    <>
      <div className={`navbar-Profile ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <img id="icon" src={require("../images/blogger.png")} alt="Icon" />
        <ul>
          <li>
            <div onClick={handleLogout}>
              <img className='logout-icon-profile' src={require("../icons/logout.png")} alt="Icon" />
            </div>
          </li>
        </ul>
      </div>
<div className='profile'>


      <div className="profile-image-container">
        {userDetails.profilePicture ? (
          <img
            src={`data:image/png;base64,${userDetails.profilePicture}`}
            alt="User Profile"
            className="profile-image"
          />
        ) : (
          <img
            src={require("../images/default-profile.jpg")} // Default profile image
            alt="Default Profile"
            className="profile-image"
          />
        )}
        <label htmlFor="imageInput">
          <img
            src={require("../icons/camera.png")}
            alt="Camera Icon"
            className="camera-icon"
          />
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <div className='profile-container'>
        <div className='profile-text'>
          <h2>User Details</h2>
          {editMode ? (
            <>
              <div className="profile-info">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  value={newFullName}
                  className='profile-input'
                  onChange={handleFullNameChange}
                  autoComplete="name"
                />
              </div>
              <div className="profile-info">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={newEmail}
                  className='profile-input'
                  onChange={handleEmailChange}
                  autoComplete="email"
                />
              </div>
              <button onClick={handleSave} className='save'>Save</button>
            </>
          ) : (
            <>
              <p>
                <strong>Full Name:</strong> {userDetails.fullName}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <button onClick={handleToggleEditMode} className='edit'>Edit</button>
            </>
          )}
        </div>
      </div>
  </div>
      <div className='update-messages'>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Profile;
