const express = require("express");
const connectDB = require('./config/db');
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');

require("dotenv").config();

const app = express();
// Conectar a la base de datos
connectDB();

app.use(express.json());
app.use(cors()); // Permitir solicitudes de otros dominios
app.use(helmet()); // Protección contra ataques comunes


  app.use('', authRoutes);
  app.use('/api/animals', animalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
