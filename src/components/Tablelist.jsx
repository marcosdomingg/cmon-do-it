import React, { useState, useEffect } from "react";

const Tablelist = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setTasks([
      { id: 1, title: "Terminar la tarea", completed: false },
      { id: 2, title: "Estudiar Tanstack", completed: true },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId !== null) {
      setTasks((prev) =>
        prev.map((task) => (task.id === editingId ? { ...task, title } : task))
      );
      setEditingId(null);
    } else {
      const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setTitle("");
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task.id);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={title}
          placeholder="Nueva tarea..."
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tarea</th>
            <th className="p-2 border">Completada</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="p-2 border">{task.id}</td>
              <td className="p-2 border">{task.title}</td>
              <td className="p-2 border">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500"
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
