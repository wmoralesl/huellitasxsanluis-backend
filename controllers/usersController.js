const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { check, validationResult } = require("express-validator");

const router = express.Router();

/**
 * Obtener todos los usuarios (solo Admin)
 */
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Excluye contraseñas
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/**
 * Obtener un usuario por ID
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/**
 * Actualizar usuario
 */
router.put("/:id", 
  authMiddleware, 
  [
    check("username").optional().isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    check("email").optional().isEmail().withMessage("Debe ser un email válido"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      // Permitir solo al usuario editar su perfil o al admin editar cualquier usuario
      if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "No autorizado" });
      }

      const { username, email } = req.body;
      if (username) user.username = username;
      if (email) user.email = email;

      await user.save();
      res.json({ message: "Usuario actualizado correctamente", user });
    } catch (err) {
      res.status(500).json({ message: "Error en el servidor" });
    }
});

/**
 * Eliminar usuario (Solo Admin)
 */
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(id, { is_active: false }, { new: true });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
