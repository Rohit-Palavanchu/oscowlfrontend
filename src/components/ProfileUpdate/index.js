import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header";
import './index.css';

const ProfileUpdate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login', { replace: true });
        }

        // Fetch user details
        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://oscowlbackend-go2i.onrender.com/todo/profile-details`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name || '');
                    setEmail(data.email || '');
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Error fetching profile');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("An unexpected error occurred while fetching your profile.");
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reset error message on each form submit

        // Prepare data for the update request
        const data = {
            name: name.trim(),
            email: email.trim(),
            currentPassword: currentPassword.trim(),
            newPassword: newPassword.trim(),
        };

        // Send the PUT request to update profile
        try {
            const response = await fetch(`https://oscowlbackend-go2i.onrender.com/todo/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                navigate('/');  // Redirect to home if update is successful
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error updating profile');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("An unexpected error occurred while updating your profile.");
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h2>Update Profile</h2>
                {error && <div className="error-message">{error}</div>} {/* Display error message */}
                <form onSubmit={handleSubmit} className="profile-update-form">
                    <div className="form-row">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    );
};

export default ProfileUpdate;
