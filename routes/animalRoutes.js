const express = require('express');
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, animalController.createAnimal);
router.get('/', animalController.getAnimals);
router.put('/:id', authMiddleware, animalController.updateAnimal);
router.delete('/:id', authMiddleware, animalController.deleteAnimal);

module.exports = router;