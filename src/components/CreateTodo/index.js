import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import './index.css';

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');  // Default status
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            title: title.trim(),
            description: description.trim(),
            status: status,  // The status field is included now
        };
    
        try {
            const response = await fetch('https://oscowlbackend-go2i.onrender.com/todo/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                setTitle('');
                setDescription('');
                setStatus('pending'); // Reset status after submit
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error creating todo:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };
    
    return (
        <>
            <Header />
            <div className="form-container">
                <h2>Create Todo</h2>
                <form onSubmit={handleSubmit} className="create-todo-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo title"
                        required
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter todo description"
                        rows="5"
                        required
                    />
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="done">Done</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default CreateTodo;
