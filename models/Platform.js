const mongoose = require('mongoose');

const PlatformSchema = mongoose.Schema({
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

module.exports = mongoose.model('platform', PlatformSchema, 'Platforms');