const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    question: { type: String, required: true },
    conclusion: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

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
    },
    history: [historySchema] // Adding history as an array of subdocuments
});

module.exports = mongoose.model('User', userSchema);
