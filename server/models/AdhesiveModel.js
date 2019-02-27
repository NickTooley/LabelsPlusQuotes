const mongoose = require('mongoose');

const adhesiveSchema = mongoose.Schema({
    adhesivename: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('adhesive', adhesiveSchema);