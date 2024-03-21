import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';
import './Profile.css';

function Profile() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const { userEmail, logout } = useUser();
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        profilePicture: '',
    });
     

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1];
            setImage(base64String);

            try {
                const response = await axios.post('http://localhost:5000/api/update-profile-picture', {
                    email: userEmail,
                    profilePicture: base64String,
                });

                console.log('Profile picture update successful:', response.data);
                setMessage('Profile picture uploaded');
                setTimeout(() => setMessage(''), 5000); // Clear message after 3 seconds
                // Refresh the page after 3 seconds
                setTimeout(() => window.location.reload(), 5000);
            } catch (error) {
                console.error('Profile picture update failed:', error.message);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!userEmail) {
                    console.error('User email is empty.');
                    return;
                }

                const userDetailsResponse = await fetch(`http://localhost:5000/api/user/${userEmail}`);

                if (userDetailsResponse.ok) {
                    const userDetailsData = await userDetailsResponse.json();
                    setUserDetails(userDetailsData);
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
    if (image===1){
        console.log("normaly used");
    }

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

            <div className='profile-container'>
                {userDetails.profilePicture ? (
                    <div className="profile-image-container">
                        <img
                            src={`data:image/png;base64,${userDetails.profilePicture}`}
                            alt="User Profile"
                            className="profile-image"
                        />
                        {message && <p>{message}</p>}
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
                ) : (
                    <div className="profile-image-container">
                        <img
                            src={require("../images/default-profile.jpg")} // Provide the path to your default image
                            alt="Default Profile"
                            className="profile-image"
                        />
                        {message && <p>{message}</p>}
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
                )}

                <div className='profile-text'>
                    <h2>User Details</h2>
                    <p>Full Name: {userDetails.fullName}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
                  
            </div>
        </>
    );
}

export default Profile;
