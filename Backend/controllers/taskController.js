import db from "../models/db.js";

export const getAllTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createTask = (req, res) => {
  const { title, completed } = req.body;
  db.query(
    "INSERT INTO tasks (title, completed) VALUES (?, ?)",
    [title, completed],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title, completed });
    }
  );
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.query(
    "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, title, completed });
    }
  );
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Tarea eliminada" });
  });
};
