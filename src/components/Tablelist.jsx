import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/tasks";

const Tablelist = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId !== null) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      setEditingId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
    }

    setTitle("");
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task.title, completed: !task.completed }),
    });
    fetchTasks();
  };

  return (
    <div className="p-4 w-3/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={title}
          placeholder="Nueva tarea..."
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-yellow-400 text-white rounded p-2 bg-transparent"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold px-4 py-2 rounded"
        >
          {editingId !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr className="bg-yellow-400">
            <th className="p-2 ">ID</th>
            <th className="p-2 ">Tarea</th>
            <th className="p-2 ">Completada</th>
            <th className="p-2 ">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center ">
              <td className="p-2 text-white">{task.id}</td>
              <td className="p-2 text-white">{task.title}</td>
              <td className="p-2 ">
                <input
                  className="checked:text-yellow-40 after:checked: text-black"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-yellow-400"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablelist;
