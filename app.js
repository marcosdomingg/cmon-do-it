import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
