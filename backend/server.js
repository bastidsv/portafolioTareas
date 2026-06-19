const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database("./tareas.db");

// Crear la tabla e insertar los datos
db.serialize(() => {

  // Eliminar la tabla si ya existe
  db.run(`DROP TABLE IF EXISTS tareas`);

  // Crear nuevamente la tabla
  db.run(`
    CREATE TABLE tareas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      url TEXT NOT NULL
    )
  `);

  // Insertar las tareas
  db.run(`
    INSERT INTO tareas (id, titulo, url)
    VALUES
    (1, 'Tarea Practica final', 'https://drive.google.com/file/d/1jSlCqMOFqt-PgshKM-x3CK2P5_2Cah3G/view'),
    (2, 'Tarea Relacion http y mysql', 'https://docs.google.com/document/d/1WH7EmPtJfFcFcdybj-UyzuzxdodSmEugLZtTyNhMReY/edit?tab=t.0'),
    (3, 'Tarea Tablas de multiplicar', 'https://docs.google.com/document/d/15Zh3YSZfoAgsNxQ2OKxdmg10TpulpwoV_krOFlXmyQw/edit?usp=drive_web&ouid=106535956746906993977')
  `);

});

// Ruta principal
app.get("/", (req, res) => {
  res.send("API funcionando correctamente. Ve a /tareas para ver las tareas.");
});

// Endpoint para obtener las tareas
app.get("/tareas", (req, res) => {
  db.all("SELECT * FROM tareas", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Error al consultar la base de datos"
      });
    }

    res.json(rows);
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});