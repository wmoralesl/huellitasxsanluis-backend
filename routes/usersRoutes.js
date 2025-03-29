const express = require("express");
const router = express.Router()

//Importar rutas individuales
const usersRoutes  = require("../controllers/usersController");

router.use("", usersRoutes);

module.exports = router;