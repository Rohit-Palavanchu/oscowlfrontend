import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import CreateTodo from './components/CreateTodo';
import TodoDetail from './components/TodoDetail';
import ProfileUpdate from './components/ProfileUpdate';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/login' element={<LoginForm/>}/>
          <Route exact path='/register' element={<RegisterForm/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/create-todo" element={<CreateTodo/>}/>
          <Route exact path="/todo/:id" element={<TodoDetail />} />
          <Route exact path="/profile" element={<ProfileUpdate/>} />
      </Routes>
    </div>
  );
}

export default App;
