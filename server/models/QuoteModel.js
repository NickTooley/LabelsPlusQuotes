const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const quoteSchema = mongoose.Schema({
    customername: {
        type: String,
        required: true,
        trim: true,
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
    attention: {
        type: String,
        trim: true,
        maxlength: 50,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    stock: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    adhesive: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    backing: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    presentation: {
        type: String,
        required: true,
    },
    coresize: {
        type: String,
        required: true,
    },
    diesize: {
        type: String,
        trim: true, 
        required: true,
        maxlength: 100
    },
    numcolors: {
        type: String,
        required: true,
    },
    additionaldetails: {
        type: String,
        trim: true,
        maxlength: 150
    },
    quantity1: {
        type: String,
        required: true,
    },
    price1: {
        type: String,
        required: true,
    },
    total1: {
        type: String,
        required: true,
    },
    quantity2: {
        type: String,
    },
    price2: {
        type: String,
    },
    total2: {
        type: String,
    },
    quantity3: {
        type: String,
    },
    price3: {
        type: String,
    },
    total3: {
        type: String,
    },
    oneoffcost: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    createdby: {
        type: String,
        maxlength: 40,
        trim: true,
        required: true,
    },
    status: { 
        type: String,
        required: true,
        default: "Pending",
    },
}, {
    timestamps: true
});

quoteSchema.plugin(AutoIncrement, {inc_field: 'quoteNum', startAt: 100000});


module.exports = mongoose.model('quote', quoteSchema);