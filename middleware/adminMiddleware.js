module.exports = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado, se requieren permisos de administrador" });
      }
    next();
  };
  