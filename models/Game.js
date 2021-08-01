const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
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
    release:
    {
        type: String,
        required: true
    },
    developer:
    {
        type: String,
        required: true
    },
    publisher:
    {
        type: String,
        required: true
    },
    cover:
    {
        type: String,
        required: true
    },
    genres:
    {
        type: Array,
        required: true
    },
    platforms:
    {
        type: Array,
        required: true
    },
    played:
    {
        type: Boolean,
        required: true
    },
    completed:
    {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('game', GameSchema, 'Games');