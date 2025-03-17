const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true, enum: ['perro', 'gato'] },
    breed: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['macho', 'hembra'] },
    description: { type: String },
    is_active: { type: Boolean, default: true },
    adopted: { type: Boolean, default: false },
    adopted_by: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Animal', animalSchema);