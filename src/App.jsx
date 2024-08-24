
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css'; 

function App() {
  const [todos, setTodos
] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  // State to track completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // State for the todo being edited
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
      <h1>Todo List</h1>

      <div className="input-area">
        <input 
          type="text" 
          placeholder="Title" 
          value={newTodoTitle} 
          onChange={(e) => setNewTodoTitle
(e.target.value)} 
        />
        <textarea 
          placeholder="Description" 
          value={newTodoDescription} 
          onChange={(e) => setNewTodoDescription(e.target.value)} 
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <br></br>
      <div className="todo-grid"> 
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <h3>{todo.title}</h3>
            <p style={{ textDecoration: completedTasks.includes(todo.id) ? 'line-through' : 'none' }}>{todo.description}</p>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            <button onClick={() => handleDoneTodo(todo.id)}>Done</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
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

export default App;


