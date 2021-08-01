const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
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

module.exports = mongoose.model('developer', DeveloperSchema, 'Developers');