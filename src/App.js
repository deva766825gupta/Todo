import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(""); // date/time input
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState(null);

  const addOrUpdateTask = () => {
    if (task.trim() === "" || dueDate === "") return alert("Please enter task and due date");

    const newTask = { text: task, due: dueDate };

    if (editIndex === null) {
      setTodos([...todos, newTask]);
      setNotification(`New task added, due on ${formatDateTime(dueDate)}`);
    } else {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTask;
      setTodos(updatedTodos);
      setNotification(`Task updated, new due date ${formatDateTime(dueDate)}`);
      setEditIndex(null);
    }

    setTask("");
    setDueDate("");
    // Remove notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (editIndex === index) {
      setTask("");
      setDueDate("");
      setEditIndex(null);
    }
  };

  const editTask = (index) => {
    setTask(todos[index].text);
    setDueDate(todos[index].due);
    setEditIndex(index);
  };

  // Helper to format date/time nicely
  const formatDateTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);
    return dateObj.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h1>Todo App with Due Date & Notification</h1>

      {/* Notification */}
      {notification && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #c3e6cb",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {notification}
        </div>
      )}

      {/* Input fields */}
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={addOrUpdateTask}
        style={{ padding: "10px 20px", width: "100%", marginBottom: "20px" }}
      >
        {editIndex === null ? "Add Task" : "Update Task"}
      </button>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{todo.text}</strong>
            </div>
            <div style={{ fontSize: "0.9em", color: "#555" }}>
              Due: {formatDateTime(todo.due)}
            </div>
            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => editTask(index)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#f0ad4e",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
