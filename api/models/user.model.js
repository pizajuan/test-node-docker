const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);