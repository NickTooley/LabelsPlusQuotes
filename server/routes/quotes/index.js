const express = require('express');
const CustomerModel = require('../../models/CustomerModel');
const QuoteModel = require('../../models/QuoteModel');
const StockModel = require('../../models/StockModel');
const AdhesiveModel = require('../../models/AdhesiveModel');
const BackingModel = require('../../models/BackingModel');
const HummusRecipe = require('hummus-recipe');

const router = express.Router();

module.exports = (params) => {
    const { } = params; 

    router.get('/new', (req,res) => res.render('quotes/newquote', {error: req.query.error, page: "New Quote"}));

    router.post('/new', async (req, res, next) => {

        //Customer Entry
        try{
            const customer = await CustomerModel.findOne({customerName: req.body.customername}).exec();

            if(!customer){
                const newcustomer = new CustomerModel({
                    customerName: req.body.customername,
                    addressLine1: req.body.addressLine1,
                    addressLine2: req.body.addressLine2,
                    addressLine3: req.body.addressLine3,
                });

                const savedCustomer = await newcustomer.save();
            }

        //Stock Entry

            const stock = await StockModel.findOne({stockname: req.body.stock}).exec();

            if(!stock){

                    const newstock = new StockModel({
                        stockname: req.body.stock,
                    });
    
                    const savedStock = await newstock.save();

            }

        

        //Adhesive Entry

            const adhesive = await AdhesiveModel.findOne({adhesivename: req.body.adhesive}).exec();

            if(!adhesive){

                    const newadhesive = new AdhesiveModel({
                        adhesivename: req.body.adhesive,
                    });
    
                    const savedAdhesive = await newadhesive.save();

            }

        

        //Backing Entry
            const backing = await BackingModel.findOne({backingname: req.body.backing}).exec();

            if(!backing){
                    const newbacking = new BackingModel({
                        backingname: req.body.backing,
                    });
    
                    const savedBacking = await newbacking.save();

            }



        //Quote Entry
        const newquote = new QuoteModel({
            customername: req.body.customername,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            addressLine3: req.body.addressLine3,
            attention: req.body.attention,
            title: req.body.title,
            stock: req.body.stock,
            adhesive: req.body.adhesive,
            backing: req.body.backing,
            presentation: req.body.presentation,
            coresize: req.body.coresize,
            diesize: req.body.diesize,
            numcolors: req.body.numcolors,
            additionaldetails: req.body.additionaldetails,
            quantity1: req.body.quantity1,
            quantity2: req.body.quantity2,
            quantity3: req.body.quantity3,
            price1: req.body.price1,
            price2: req.body.price2,
            price3: req.body.price3,
            total1: req.body.total1,
            total2: req.body.total2,
            total3: req.body.total3,
            oneoffcost: req.body.oneoffcost,
            createdby: req.user.username,
        });

        const savedquote = await newquote.save();

        if(!savedquote){
            return done(null, false, {message: "Invalid data"});
        }

        const pdfDoc = new HummusRecipe('template.pdf', 'output2.pdf');
            pdfDoc
                // edit 1st page
                .editPage(1)
                .text(savedquote.customername, 36, 154, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.addressLine1, 36, 170, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.addressLine2, 36, 186, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.addressLine3, 36, 202, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.attention, 64, 234, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.date.toLocaleDateString('en-NZ'), 430, 154, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.quoteNum + 100000, 430, 169.6, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.title, 185, 276, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.stock, 185, 290, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.adhesive, 185, 319, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.backing, 185, 333, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.presentation + ' per Roll', 185, 347, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.coresize + 'mm', 185, 361, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.diesize, 185, 375, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.numcolors, 185, 389, {
                    color: '000000',
                    fontSize: 12
                })
                .endPage()
                .endPDF(()=>{ res.redirect('/') });

    }catch(err){
        return next(err);

    }

    });

    return router;

}
