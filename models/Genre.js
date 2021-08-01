const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    _id:
    {
        type: String
    },
    name:
    {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('genre', GenreSchema, 'Genres');