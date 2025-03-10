const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();
const routes = require("./routes"); // Importa el router desde routes/index.js

const app = express();

app.use(express.json());
app.use(cors()); // Permitir solicitudes de otros dominios
app.use(helmet()); // Protección contra ataques comunes

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.use("/", routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
