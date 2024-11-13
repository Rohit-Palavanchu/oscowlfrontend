import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("https://oscowlbackend-go2i.onrender.com/todo/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) {
            setMessage(data.message);
        } else {
            const expirationTime = new Date();
            expirationTime.setTime(expirationTime.getTime() + (1 * 60 * 60 * 1000));
            Cookies.set('token', data.token, { expires: expirationTime });
            navigate('/', {replace:true});
        }
    };

    const onNavigateRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="card login">
                <h2>Login</h2>
                <form onSubmit={onSubmitLogin}>
                    <input onChange={onChangeUsername} type="text" placeholder="Username" required />
                    <input onChange={onChangePassword} type="password" placeholder="Password" required />
                    <div className="register-class">
                        <span className="error-message">{message}</span>
                        <p onClick={onNavigateRegister} className="register-now">Register Now</p>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;