const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todosdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.json(newTodo);
});

// Update todo by ID
app.put('/todos/:id', async (req, res) => {
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(updatedTodo);
});

// Delete todo by ID
app.delete('/todos/:id', async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
