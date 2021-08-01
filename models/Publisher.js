const mongoose = require('mongoose');

const PublisherSchema = mongoose.Schema({
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

module.exports = mongoose.model('publisher', PublisherSchema, 'Publishers');