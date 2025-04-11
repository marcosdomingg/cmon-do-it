# 📝 CMON DO IT - Fullstack To-Do App

Una aplicación To-Do lista para producción, creada con **React (Vite)** en el frontend y **Node.js (Express)** en el backend, con base de datos **MySQL**.

---

## VIDEO DE YOUTUBE HACIENDO PRUEBA UNITARIA DEL PROYECTO CON SELENIUM Y MOCHA:

(https://youtu.be/CgRwHGWhd3o)


## 🧱 Tecnologías utilizadas

- **Frontend**: React 19 + Vite + TailwindCSS + Flowbite + Lucide
- **Backend**: Node.js + Express + MySQL2
- **Base de datos**: MySQL
- **Estilos**: TailwindCSS + DaisyUI/Flowbite

---

## 🚀 Cómo ejecutar el proyecto

### 🔹 1. Clona el repositorio

```bash
git clone https://github.com/marcosdomingg/cmon-do-it.git
cd cmon-do-it
```

---

## 🔧 Configuración del Backend (Express + MySQL)

### 🔹 2. Ve a la carpeta del backend e instala dependencias

```bash
cd Backend
npm install
```

---

### 🔹 3. Crea un archivo `.env` con tus credenciales de MySQL

```bash
touch .env
```

Y coloca dentro:

```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=todo_db
```

> ⚠️ Reemplaza `tu_contraseña_mysql` por la contraseña real de tu base de datos.

---

### 🔹 4. Crea la base de datos y la tabla en MySQL

Entra a MySQL desde terminal:

```bash
mysql -u root -p
```

Ejecuta estas instrucciones SQL:

```sql
CREATE DATABASE IF NOT EXISTS todo_db;

USE todo_db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
```

---

### 🔹 5. Inicia el servidor del backend

```bash
npm run dev
```

Deberías ver:

```
✅ Conectado a MySQL
Servidor corriendo en http://localhost:3001
```

Prueba el endpoint en navegador o Postman:

```
http://localhost:3001/api/tasks
```

---

## 💻 Configuración del Frontend (React + Vite)

### 🔹 6. Ve a la carpeta `delproyecto` e instala dependencias

```bash
cd ../delproyecto
npm install
```

---

### 🔹 7. Inicia el servidor del frontend

```bash
npm run dev
```

### 🔹 8. Inicia las pruebas unitarias desde la carpeta principal del proyecto

```bash
npm run test
```


Abre tu navegador en:  
👉 http://localhost:5173

---

## 📡 API REST disponible

| Método | Endpoint         | Descripción              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/tasks`     | Obtener todas las tareas |
| POST   | `/api/tasks`     | Crear nueva tarea        |
| PUT    | `/api/tasks/:id` | Actualizar tarea         |
| DELETE | `/api/tasks/:id` | Eliminar tarea           |

---

## ✨ Funcionalidades

- ✅ Agregar tareas
- ✏️ Editar tareas
- 🗑️ Eliminar tareas
- ✅ Marcar tareas como completadas
- 🔄 Conexión real a API REST con MySQL

---

## 📚 Recursos útiles

- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [Flowbite](https://flowbite.com/)

---

## 🧪 Pruebas Unitarias Captura: (TAREA 4)

### Crear Tarea

![Vista general](/screenshot_mocha/tarea-creada.png)

### Tarea Completada

![Tarea completadas](/screenshot_mocha/tarea-completada.png)

### Tarea Eliminada

![Tarea Eliminada](/screenshot_mocha/tarea-eliminada.png)

### Buscar Tarea

![Buscar Tarea](/screenshot_mocha/buscar-tarea.png)


## 📸 Capturas Generales (TAREA 3)

### Vista general de la aplicación 

![Vista general](/public/screenshots/VISTA-GENERAL.png)

### Tareas completadas

![Tareas completadas](/public/screenshots/TAREAS-COMPLETADAS.png)

### MySQL vista Tareas completadas

![Tareas completadas](/public/screenshots/SELECT-SQL.png)

### GitFlow

![Tareas completadas](/public/screenshots/GitFlow.png)

## 👨‍💻 Autor

**Marcos Domínguez**  
🔗 [GitHub](https://github.com/marcosdomingg)

## 📜 Licencia

Este proyecto está bajo la licencia **MIT License** 📄, lo que significa que puedes utilizarlo, modificarlo y distribuirlo libremente.
