const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Permite recibir JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error de conexión', err));

// Modelo básico
const User = require('./models/User');

// Ruta simple para crear usuarios
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Obtiene todos los usuarios de la base de datos
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});


app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
