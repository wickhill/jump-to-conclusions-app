const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    conclusions: {
        type: Map,
        of: Number
    },
    unlockedAchievements: {
        type: Map,
        of: Boolean,
        default: () => new Map()
    }
});

module.exports = mongoose.model('User', userSchema);
