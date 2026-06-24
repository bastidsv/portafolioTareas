const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database("./agenda.db");

// Crear la tabla e insertar los datos
db.serialize(() => {
  // Eliminar la tabla si ya existe
  db.run(`DROP TABLE IF EXISTS agenda`);

  // Crear nuevamente la tabla
  db.run(`
    CREATE TABLE agenda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dia TEXT NOT NULL,
      nombre TEXT NOT NULL,
      ubicacion TEXT NOT NULL,
      contacto TEXT NOT NULL
    )
  `);

  // Insertar datos de ejemplo
  db.run(`
    INSERT INTO agenda (dia, nombre, ubicacion, contacto)
    VALUES
    ('Lunes', 'Juan Pérez', 'Culiacán Centro', '6671234567'),
    ('Martes', 'María López', 'Tres Ríos', '6677654321'),
    ('Miércoles', 'Carlos Ramírez', 'Universidad', '6671112233'),
    ('Jueves', 'Ana Torres', 'Las Quintas', '6674445566'),
    ('Viernes', 'Pedro Sánchez', 'Barrancos', '6677778899'),
    ('Sábado', 'Luis Hernández', 'Humaya', '6679990011')
  `);
});

// Ruta principal
app.get("/", (req, res) => {
  res.send("API de agenda funcionando correctamente. Ve a /agenda para ver los datos.");
});

// Endpoint para obtener toda la agenda
app.get("/agenda", (req, res) => {
  db.all("SELECT * FROM agenda", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Error al consultar la base de datos"
      });
    }

    res.json(rows);
  });
});

// Endpoint para obtener agenda por día
app.get("/agenda/:dia", (req, res) => {
  const dia = req.params.dia;

  db.all("SELECT * FROM agenda WHERE dia = ?", [dia], (err, rows) => {
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