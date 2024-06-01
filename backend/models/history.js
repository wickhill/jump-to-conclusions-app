const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    username: { type: String, required: true, unique: true },
    question: { type: String, required: false},
    conclusion: { type: String, required: true }
});

module.exports = historySchema;
