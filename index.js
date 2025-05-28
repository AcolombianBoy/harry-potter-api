const express = require('express');
const app = express();

// Datos directamente aquí
const characters = [
  { name: "Harry Potter", house: "Gryffindor" },
  { name: "Hermione Granger", house: "Gryffindor" },
  { name: "Ron Weasley", house: "Gryffindor" },
  { name: "Draco Malfoy", house: "Slytherin" }
];

// Servir archivos estáticos desde "public"
app.use(express.static('public'));

// Ruta API
app.get('/characters', (req, res) => {
  res.json(characters);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
