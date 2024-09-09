import { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../App.css';

import React from 'react';
import NavigateButton from '../components/NavigateButton.jsx';
import { Link } from 'react-router-dom';

//const AboutPage = () => (
function AboutPage() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  
  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);
	
  // State for the todo being edited
  const [editingTodo, setEditingTodo] = useState(null);

  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/todos.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodos(data);
        console.log("Fetched data:", data); // Log to check fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      description: newTodoDescription
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
    setNewTodoDescription('');

    saveTodosToServer([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    saveTodosToServer(updatedTodos);
  };

  const saveTodosToServer = async (updatedTodos) => {
    try {
      const response = await axios.post('http://localhost:5000/save-todos', updatedTodos);
      console.log(response.data);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const handleEditTodo = (todo) => {
    console.log("Editing todo:", todo); // Log the todo object being edited
    setEditingTodo(todo);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleDoneTodo = (id) => {
    setCompletedTasks([...completedTasks, id]);
  };

  const handleSaveEdit = () => {
    console.log("Saving changes:", editedTitle, editedDescription); // Log the edited values
    if (editingTodo) {
      setTodos(prevTodos => prevTodos.map(todo =>
        todo.id === editingTodo.id
          ? { ...todo, title: editedTitle, description: editedDescription }
          : todo
      ));
      setEditingTodo(null);
      // Call saveTodosToServer to persist changes if needed
    }
  };
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };


  return (
  <div className="app-container">
    <h1>About Page</h1>
    <Link to="/">Go to Home Page</Link>

	  <div className="input-area">
        <input
          type="text"
          placeholder="Task"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle
(e.target.value)}
        />
        <br></br>
        <textarea
          placeholder="Description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
  </div>
);
}

export default AboutPage;

