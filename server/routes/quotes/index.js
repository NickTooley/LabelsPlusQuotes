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

    router.get('/new', async (req,res) => {
        const customers = await CustomerModel.find();
        const toPass = [];
        customers.forEach(element => {
            toPass.push({"label":element.customerName, "addr1":element.addressLine1, "addr2":element.addressLine2, "addr3":element.addressLine3});
        });
        const customersJSON = JSON.stringify(toPass);
        res.render('quotes/newquote', {error: req.query.error, page: "New Quote", customers: customersJSON});
        });

    router.get('/customer/:id', async (req, res, next) => {
        const customer = await CustomerModel.findById(req.params.id);
        const allQuotes = await QuoteModel.find({customername: customer.customerName});

        res.render('quotes/customers', {quotes: allQuotes, customer: customer});
    });

    router.get('/edit/:id', async (req, res, next) => {
        const quote = await QuoteModel.findOne({quoteNum: req.params.id});

        if(!quote) return next();

        res.render('quotes/edit', {quote:quote});
    })

    router.get('/generate/:id', async (req, res, next) => {
        try{

        //res.setHeader('Content-Type', 'application/pdf');

        const savedquote = await QuoteModel.findOne({quoteNum: req.params.id})

        if(!savedquote) return next();

        var additional1 = " ";
        var additional2 = " ";
        var additional3 = " ";

        const MAX_LENGTH = 50;

        const additionalLength = savedquote.additionaldetails.length;

        if(additionalLength > 0 ){
            if(additionalLength > MAX_LENGTH){
                if(additionalLength > MAX_LENGTH * 2){
                    const str1 = savedquote.additionaldetails.slice(0,MAX_LENGTH).lastIndexOf(" ") + 1;
                    const str2 = str1 + savedquote.additionaldetails.slice(str1, str1 + MAX_LENGTH).lastIndexOf(" ") + 1;
                    const str3 = additionalLength;

                    additional1 = savedquote.additionaldetails.slice(0,str1);
                    additional2 = savedquote.additionaldetails.slice(str1,str2);
                    additional3 = savedquote.additionaldetails.slice(str2,str3);

                }else{
                    const str1 = savedquote.additionaldetails.slice(0,MAX_LENGTH).lastIndexOf(" ") + 1;
                    const str2 = additionalLength;

                    additional1 = savedquote.additionaldetails.slice(0,str1);
                    additional2 = savedquote.additionaldetails.slice(str1,str2);

                }
            }else{
                additional1 = savedquote.additionaldetails;
            }
        }

        const pdfDoc = new HummusRecipe('template.pdf', 'output.pdf');
            pdfDoc
                // edit 1st page
                .editPage(1)
                .text(savedquote.date.toLocaleDateString('en-NZ'), 430, 154, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.quoteNum, 430, 169.6, {
                    color: '000000',
                    fontSize: 12
                })
                .text(additional1, 185, 420, {
                    color: '000000',
                    fontSize: 12
                })
                .text(additional2, 185, 434, {
                    color: '000000',
                    fontSize: 12
                })
                .text(additional3, 185, 448, {
                    color: '000000',
                    fontSize: 12
                })
                .text(savedquote.createdby, 36, 782, {
                    color: '000000',
                    fontSize: 11
                });

                if(savedquote.customername != ""){
                    pdfDoc.text(savedquote.customername, 36, 154, {
                    color: '000000',
                    fontSize: 12
                    });
                }

                if(savedquote.attention != ""){
                    pdfDoc.text(savedquote.attention, 64, 234, {
                    color: '000000',
                    fontSize: 12
                    });
                
                }

                if(savedquote.addressLine1 != ""){
                    pdfDoc.text(savedquote.addressLine1, 36, 170, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.addressLine2 != ""){
                    pdfDoc.text(savedquote.addressLine2, 36, 186, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.addressLine3 != ""){
                    pdfDoc.text(savedquote.addressLine3, 36, 202, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.title != ""){
                    pdfDoc.text(savedquote.title, 185, 276, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.stock != ""){
                    pdfDoc.text(savedquote.stock, 185, 290, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.adhesive != ""){
                    pdfDoc.text(savedquote.adhesive, 185, 319, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.backing != ""){
                    pdfDoc.text(savedquote.backing, 185, 333, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.presentation != ""){
                    pdfDoc.text(savedquote.presentation + ' per Roll', 185, 347, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.coresize != ""){
                    pdfDoc.text(savedquote.coresize + 'mm', 185, 361, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.diesize != ""){
                    pdfDoc.text(savedquote.diesize, 185, 375, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.numcolors != ""){
                    pdfDoc.text(savedquote.numcolors, 185, 389, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.oneoffcost != ""){
                    pdfDoc.text(savedquote.oneoffcost, 185, 554, {
                        color: '000000',
                        fontSize: 12
                    });
                }

                if(savedquote.quantity1 != " "){
                    pdfDoc.text("$" + savedquote.quantity1, 36, 497, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.quantity2 != " "){
                    pdfDoc.text("$" + savedquote.quantity2, 36, 511, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.quantity3 != " "){
                    pdfDoc.text("$" + savedquote.quantity3, 36, 525, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.price1 != " "){
                    pdfDoc.text("$" + savedquote.price1 + " per " + savedquote.presentation, 180, 497, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.price2 != " "){
                    pdfDoc.text("$" + savedquote.price2 + " per " + savedquote.presentation, 180, 511, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.price3 != " "){
                    pdfDoc.text("$" + savedquote.price3 + " per " + savedquote.presentation, 180, 525, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.total1 != " "){
                    pdfDoc.text("$" + savedquote.total1, 324, 497, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.total2 != " "){
                    pdfDoc.text("$" + savedquote.total2, 324, 511, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                if(savedquote.total3 != " "){
                    pdfDoc.text("$" + savedquote.total3, 324, 525, {
                        color: '000000',
                        fontSize: 12
                    })
                }

                pdfDoc
                    .endPage()
                    .endPDF(()=>{ res.download('output.pdf', 'Labels Plus Quote #' + savedquote.quoteNum + '.pdf');
            });

        }catch(err){
            return next(err);
        }



    });

    router.post('/edit/:id', async (req, res, next) => {
        console.log("Hello");
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


        const quote = await QuoteModel.findOne({quoteNum: req.params.id});
        
        quote.customername = req.body.customername;
        quote.addressLine1 = req.body.addressLine1;
        quote.addressLine2 = req.body.addressLine2;
        quote.addressLine3 = req.body.addressLine3;
        quote.attention = req.body.attention;
        quote.title = req.body.title;
        quote.stock = req.body.stock;
        quote.adhesive = req.body.adhesive;
        quote.backing = req.body.backing;
        quote.presentation = req.body.presentation;
        quote.coresize = req.body.coresize;
        quote.diesize = req.body.diesize;
        quote.numcolors = req.body.numcolors;
        quote.additionaldetails = req.body.additionaldetails;
        quote.quantity1 = req.body.quantity1;
        quote.quantity2 = req.body.quantity2;
        quote.quantity3 = req.body.quantity3;
        quote.price1 = req.body.price1;
        quote.price2 = req.body.price2;
        quote.price3 = req.body.price3;
        quote.total1 = req.body.total1;
        quote.total2 = req.body.total2;
        quote.total3 = req.body.total3;
        quote.oneoffcost = req.body.oneoffcost;
        quote.createdby = req.user.username;

        const savedquote = await quote.save();
        if(!savedquote){
            return done(null, false, {message: "Invalid data"});
        }
        res.redirect('/quotes/generate/'+savedquote.quoteNum);

        
        }catch(err){
            return next(err);

        }
    });

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

        res.redirect('/quotes/generate/'+savedquote.quoteNum);

        
        }catch(err){
            return next(err);

        }

    });

    return router;

}
