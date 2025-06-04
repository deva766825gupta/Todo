import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (editIndex === null) {
      // Add new task
      setTodos([...todos, task]);
    } else {
      // Update existing task
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    }

    setTask("");
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (editIndex === index) {
      setTask("");
      setEditIndex(null);
    }
  };

  const editTask = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={addOrUpdateTask} style={{ padding: "8px 16px" }}>
        {editIndex === null ? "Add" : "Update"}
      </button>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {todo}
            <button
              onClick={() => editTask(index)}
              style={{
                marginLeft: "10px",
                padding: "4px 10px",
                background: "orange",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(index)}
              style={{
                marginLeft: "5px",
                padding: "4px 10px",
                color: "white",
                background: "red",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
