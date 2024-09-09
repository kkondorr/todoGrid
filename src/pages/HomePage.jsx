
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../App.css';

import React from 'react';
import NavigateButton from '../components/NavigateButton.jsx';

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  
  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);
  
  // State for the todo being edited
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // State to control visibility of the form
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState('');
  //const [pageContent, setPageContent] = useState('Initial Page Content');

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setPageContent(formData);
    setIsFormVisible(false);
    setFormData(''); // Clear form data after submission
  };

  const handleFormChange = (event) => {
    setFormData(event.target.value);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    //setFormData(''); // Clear form data if canceled
    setNewTodoTitle('');
    setNewTodoDescription('');
  };
  ///////////////

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
	  //set form visibility
	  setIsFormVisible(false);
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
      <h1>My Todo List</h1>
{/*
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
      <br></br>
      <a href="/MyForm" id="addCardButton">Add Card2</a>
      <div>
       <NavigateButton to="/about" label="Go to About Page" />
      </div>
*/}
      <br></br>
      <div className="todo-grid"> 
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <h3 style={{ textDecoration: completedTasks.includes(todo.id) ? 'line-through green 4px' : 'none' }}>{todo.title}</h3>
            <p style={{ textDecoration: completedTasks.includes(todo.id) ? 'line-through red 3px' : 'none' }}>{todo.description}</p>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            <button onClick={() => handleDoneTodo(todo.id)}>Done</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
      <br></br>
      <div className="app-container">
	  <button id="addCardButton" onClick={handleButtonClick}>Open Form</button>
      {isFormVisible && (
        <Form
          onSubmit={handleAddTodo}
	  setNewTodoTitle={setNewTodoTitle}
	  setNewTodoDescription={setNewTodoDescription}
	  newTodoTitle={newTodoTitle}
	  newTodoDescription={newTodoDescription}
	  onCancel={handleCancel}
        />
      )}

      </div>

      {/* Modal for Editing */}
      {editingTodo && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Todo</h2>
            <input 
              type="text" 
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)} 
            />
            <textarea 
              value={editedDescription} 
              onChange={(e) => setEditedDescription(e.target.value)} 
            />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
            
    </div>
  );
}

function Form({onSubmit, setNewTodoTitle, setNewTodoDescription, newTodoTitle, newTodoDescription, onCancel }) {
  return (
  <form onSubmit={onSubmit}>
      <label>
        New Content:
        <input type="text"
	       placeholder="Task"
	       value={newTodoTitle}
	       onChange={(e) => setNewTodoTitle (e.target.value)}
	/>
	<textarea
	       placeholder="Description"
	       value={newTodoDescription}
	       onChange={(e) => setNewTodoDescription(e.target.value)}
	/>
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
  </form>
  );
}


export default HomePage;


