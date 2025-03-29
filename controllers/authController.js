const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos
  message: "Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde."
});

// Registro
router.post("/register",
  [
    check("email").isEmail().withMessage("Debe ser un email válido"),
    check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  try {
    const { username, email, password, role } = req.body;
    // Verificar si el correo del usuario existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Este correo ya está registrado" });
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      username,
      email, 
      password: hashedPassword, 
      role 
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Inicio de sesión
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Excluye la contraseña
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
    // Opción 1: Si usas JWT en el frontend (eliminar el token del cliente)
    res.status(200).json({ message: "Sesión cerrada exitosamente" });

    // Opción 2: Si usas cookies (limpiar la cookie)
    // res.clearCookie('token').json({ message: "Sesión cerrada exitosamente" });
})

module.exports = router;
