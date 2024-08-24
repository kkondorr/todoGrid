const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000; // Choose a port

app.use(cors()); // Enable CORS for development
app.use(express.json()); // To parse JSON request bodies

// Endpoint to save todos
app.post('/save-todos', (req, res) => {
  const updatedTodos = req.body;

  fs.writeFile('./public/todos.json', JSON.stringify(updatedTodos), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error saving todos');
    } else {
      console.log('Todos saved successfully!');
      res.status(200).send('Todos saved');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
