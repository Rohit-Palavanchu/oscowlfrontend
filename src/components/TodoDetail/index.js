import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header";
import './index.css';

const TodoDetail = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login', { replace: true });
        }

        const fetchTodo = async () => {
            try {
                const response = await fetch(`https://oscowlbackend-go2i.onrender.com/todo/todo/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTitle(data.todo.title || '');
                    setDescription(data.todo.description || '');
                    setStatus(data.todo.status || 'pending');
                } else {
                    console.error("Error fetching todo:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching todo:", error);
            }
        };

        fetchTodo();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTodo = {
            title: title.trim(),
            description: description.trim(),
            status: status.trim(),
        };

        try {
            const response = await fetch(`https://oscowlbackend-go2i.onrender.com/todo/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify(updatedTodo),
            });

            if (response.ok) {
                setIsEditing(false);
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h2>{isEditing ? 'Edit Todo' : 'View Todo'}</h2>
                <form onSubmit={handleSubmit} className="create-todo-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo title"
                        disabled={!isEditing}
                        required
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter todo description"
                        rows="5"
                        disabled={!isEditing}
                        required
                    />
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        disabled={!isEditing}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <div className="form-actions">
                        {isEditing ? (
                            <>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default TodoDetail;
