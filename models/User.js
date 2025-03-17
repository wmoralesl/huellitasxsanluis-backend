const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'staff', 'volunteer'], default: 'volunteer' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
