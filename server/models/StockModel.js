const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    stockname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('stock', stockSchema);