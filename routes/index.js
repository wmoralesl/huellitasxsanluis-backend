const express = require("express");
const router = express.Router()

//Importar rutas individuales
const authRoutes = require("../controllers/authController");

router.use("/api/auth", authRoutes);

module.exports = router;