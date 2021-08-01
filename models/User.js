const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id:
    {
        type: String
    },
    name:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('user', UserSchema, 'Users');