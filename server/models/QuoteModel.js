const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment-timezone');

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
        default: new Date(),
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
    },
    price1: {
        type: String,
    },
    total1: {
        type: String,
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
    quantities: {
        type: [String],
    },
    prices: {
        type: [String],
    },
    totals: {
        type: [String],
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

quoteSchema.pre('save', async function preSave(next){
    const quote = this;
    if(!quote.isModified()) return next();
    try{
        const date = new Date();
        date.setHours(date.getHours() - 13);
        quote.date = date;
        return next();
    } catch(err){
        return next(err);
    }
});

module.exports = mongoose.model('quote', quoteSchema);