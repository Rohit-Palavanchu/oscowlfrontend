import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    if(Cookies.get('token')){
        navigate('/', { replace: true });
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onSubmitRegister = async (e) => {
        e.preventDefault();
        const response = await fetch("https://oscowlbackend-go2i.onrender.com/todo/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, name, email })
        });
        const data = await response.json();
        if (!response.ok) {
            setMessage(data.message);
        } else {
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="login-container">
            <div className="card login">
                <h2>Register</h2>
                <form onSubmit={onSubmitRegister}>
                    <input
                        onChange={onChangeUsername}
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                    />
                    <input
                        onChange={onChangeName}
                        type="text"
                        placeholder="Full Name"
                        required
                        value={name}
                    />
                    <input
                        onChange={onChangeEmail}
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                    />
                    <input
                        onChange={onChangePassword}
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                    />
                    <span className="error-message">{message}</span>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
