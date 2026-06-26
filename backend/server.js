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
    ('Lunes', 'Juntas Luis Mimado', 'https://maps.app.goo.gl/T3fuH6XhzKAEmLav5', '6674013489'),
    ('Lunes', 'Galleros', 'https://maps.app.goo.gl/uXe4cEJqB4P5yoZ56', 'xx'),
    ('Lunes', 'Don Emilio', 'https://maps.app.goo.gl/BrmLD1rQtyBPhwE6A', 'xx'),
    ('Lunes', 'Joel Cocinero', 'https://maps.app.goo.gl/H4c6kXo5iBkdUWcT9', 'xx'),
    ('Lunes', 'Canelos', 'https://maps.app.goo.gl/jaUnb7HdUsbMv2fQ8', 'xx'),
    ('Lunes', 'Jorge Castro', 'https://maps.app.goo.gl/Ta9WJLPjjPp5eNzN7', 'xx'),
    ('Lunes', 'Ramon beltran', 'https://maps.app.goo.gl/jxnVehiDnR2hT1oh6', 'xx'),
    ('Lunes', 'El gringo', 'https://maps.app.goo.gl/iUR7QqsTShNXdoTu9', 'xx'),
    ('Lunes', 'Marlon palmito', 'https://maps.app.goo.gl/ECzoDerUnw2tfwLq8', 'xx'),
    ('Lunes', 'Hacienda Molino de las flores', 'https://maps.app.goo.gl/QfpNkQsgWUr1swdm7', 'xx'),
    ('Lunes', 'Primavera Ley 75', 'https://maps.app.goo.gl/TkasX2UjDo2w61gd7', 'x'),
    ('Martes', 'Panchito', 'https://maps.app.goo.gl/VzVcmDfCHDYQkE7PA', 'xx'),
    ('Martes', 'Saul', 'https://maps.app.goo.gl/jNht5PYDFaCWLJYK9', 'xx'),
    ('Martes', 'Hacienda El Amigo', 'https://maps.app.goo.gl/tnb6CK2T9bYUwfeZ7', 'xx'),
    ('Martes', 'Mama Charlie', 'https://maps.app.goo.gl/vAcZvK5YpV6xv19s6', 'xx'),
    ('Martes', 'Maralago', 'https://maps.app.goo.gl/pSTjuvBP9wGeQYvE9', 'xx'),
    ('Martes', 'Marlon Los Agaves', 'https://maps.app.goo.gl/b2s9VhCs2iFoUTtW7', 'xx'),
    ('Miercoles', 'LLuvia', 'https://maps.app.goo.gl/CkRFMFqA4TkXnGNw5', 'xx'),
    ('Miercoles', 'Canelos', 'https://maps.app.goo.gl/jaUnb7HdUsbMv2fQ8', 'xx'),
    ('Miercoles', 'Primavera Ley 75', 'https://maps.app.goo.gl/TkasX2UjDo2w61gd7', 'x'),
    ('Miercoles', 'El gringo', 'https://maps.app.goo.gl/iUR7QqsTShNXdoTu9', 'xx'),
    ('Miercoles', 'Ramon beltran', 'https://maps.app.goo.gl/jxnVehiDnR2hT1oh6', 'xx'),
    ('Miercoles', 'Don Emilio', 'https://maps.app.goo.gl/BrmLD1rQtyBPhwE6A', 'xx'),
    ('Jueves', 'Hacienda El Amigo', 'https://maps.app.goo.gl/tnb6CK2T9bYUwfeZ7', 'xx'),
    ('Jueves', 'Salon villas del sol', 'https://maps.app.goo.gl/GLKpNhCYicKM6fFS9', 'xx'),
    ('Jueves', 'Hacienda Molino de las flores', 'https://maps.app.goo.gl/QfpNkQsgWUr1swdm7', 'xx'),
    ('Viernes', 'Juntas Luis Mimado', 'https://maps.app.goo.gl/T3fuH6XhzKAEmLav5', '6674013489'),
    ('Viernes', 'Galleros', 'https://maps.app.goo.gl/uXe4cEJqB4P5yoZ56', 'xx'),
    ('Viernes', 'Don Emilio', 'https://maps.app.goo.gl/BrmLD1rQtyBPhwE6A', 'xx'),
    ('Viernes', 'Joel Cocinero', 'https://maps.app.goo.gl/H4c6kXo5iBkdUWcT9', 'xx'),
    ('Viernes', 'Arturo Castro', 'https://maps.app.goo.gl/H872rFopFP1AY43n9', 'xx'),
    ('Viernes', 'Jorge Castro', 'https://maps.app.goo.gl/Ta9WJLPjjPp5eNzN7', 'xx'),
    ('Viernes', 'Canelos', 'https://maps.app.goo.gl/jaUnb7HdUsbMv2fQ8', 'xx'),
    ('Viernes', 'Ramon beltran', 'https://maps.app.goo.gl/jxnVehiDnR2hT1oh6', 'xx'),
    ('Viernes', 'El gringo', 'https://maps.app.goo.gl/iUR7QqsTShNXdoTu9', 'xx'),
    ('Viernes', 'La fina', 'https://maps.app.goo.gl/PGHXFVZpW7rUinU76', 'xx'),
    ('Viernes', 'Primavera Ley 75', 'https://maps.app.goo.gl/TkasX2UjDo2w61gd7', 'x'),
    ('Sabado', 'Panchito', 'https://maps.app.goo.gl/VzVcmDfCHDYQkE7PA', 'xx'),
    ('Sabado', 'Hacienda El Amigo', 'https://maps.app.goo.gl/tnb6CK2T9bYUwfeZ7', 'xx'),
    ('Sabado', 'Mama Charlie', 'https://maps.app.goo.gl/vAcZvK5YpV6xv19s6', 'xx'),
    ('Sabado', 'Maralago', 'https://maps.app.goo.gl/pSTjuvBP9wGeQYvE9', 'xx')
    
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