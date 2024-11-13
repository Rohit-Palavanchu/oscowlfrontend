import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Header from "../Header";
import './index.css';
import Cookies from 'js-cookie';

const TodoItem = (props) => {
    const { todo, onViewTodo, onDelete } = props;

    const handleViewTodo = () => {
        onViewTodo(todo.id);
    };

    return (
        <div className="card-container">
            <h6 className="title">{todo.title}</h6>
            <div className="card-content">
                <span onClick={handleViewTodo} className="view-more">View Details</span>
                <button onClick={() => onDelete(todo.id)} className="delete-button">
                    <AiOutlineDelete />
                </button>
            </div>
        </div>
    );
};

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    const onCreateTodo = () => {
        navigate('/create-todo');
    };

    const fetchTodos = async () => {
        const response = await fetch('https://oscowlbackend-go2i.onrender.com/todo/todos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        });
        const data = await response.json();
        setTodos(data.todos || []);
    };

    const handleViewTodo = (id) => {
        navigate(`/todo/${id}`);
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token');
        const response = await fetch(`https://oscowlbackend-go2i.onrender.com/todo/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setTodos(todos.filter(todo => todo.id !== id));
        } else {
            setNotification('Not authorized');
            setTimeout(() => setNotification(''), 5000);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <Header />
            {notification && <div className="notification">{notification}</div>}
            <div className="create-todo-btn-container">
                <button onClick={onCreateTodo} className="create-todo-btn">Create Todo+</button>
            </div>
            <div className="todo-container">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onViewTodo={handleViewTodo} onDelete={handleDelete} />
                ))}
            </div>
        </>
    );
};

export default Home;
