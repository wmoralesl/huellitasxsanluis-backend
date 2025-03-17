const Animal = require('../models/Animal');

exports.createAnimal = async (req, res) => {
    const { name, species, breed, age, gender, description } = req.body;
    try {
        const animal = new Animal({ name, species, breed, age, gender, description });
        await animal.save();
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find({ is_active: true });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.findByIdAndUpdate(id, req.body, { new: true });
        res.json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.findByIdAndUpdate(id, { is_active: false }, { new: true });
        res.json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};