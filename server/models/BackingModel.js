const mongoose = require('mongoose');

const backingSchema = mongoose.Schema({
    backingname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('backing', backingSchema);