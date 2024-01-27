import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description.");
      return;
    }
    axios
      .post("http://localhost:5000/todos", { title, description })
      .then((response) => {
        setTodos([...todos, response.data]);
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const updateTodo = (id) => {
    const updatedTitle = prompt("Enter updated title:", title);
    const updatedDescription = prompt(
      "Enter updated description:",
      description
    );

    axios
      .put(`http://localhost:5000/todos/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
      })
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? response.data : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/todos/${id}`)
        .then((response) => {
          const updatedTodos = todos.filter((todo) => todo._id !== id);
          setTodos(updatedTodos);
        })
        .catch((error) => console.error("Error deleting todo:", error));
    }
  };
  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <form>
          <div className="formInput">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              placeholder="Enter your title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label>Description:</label>

            <textarea
              type="text"
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={addTodo}>Add Todo</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <div className="dist">
                {" "}
                <div className="distOne">
                  <strong>{todo.title}</strong>: {todo.description}
                </div>
                <div className="distTwo">
                  <button onClick={() => updateTodo(todo._id)}>Update</button>
                  <button onClick={() => deleteTodo(todo._id)} className="del">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
