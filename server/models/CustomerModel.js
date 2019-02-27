const mongoose = require('mongoose');

customerSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true,
        index: {unique: true}, 
        minlength: 2,
    },
    addressLine1: {
        type: String,
        trim: true,
        maxlength: 50,
    },
    addressLine2: {
        type: String,
        trim: true,
        maxlength: 50,
    },
    addressLine3: {
        type: String,
        trim: true,
        maxlength: 50,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('customer', customerSchema);
