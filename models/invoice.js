const requestPromise = require("request-promise");

const DB = require("../configs/database");
const MS = require("../configs/config").MicroServices;

// this function will check for the item type and
// call the order api MS for getting details of order
const getParsedInvoiceItem = async (itemId, itemType) => {
    let url;
    if (itemType === "order"){
        url = `${MS.orderService}orders/${itemId}.json`;
        let response = await requestPromise(url);
        response = JSON.parse(response);
        return response;
    }
};

// its responsible for generating the invoice of an order
// this will send the email if required and also create a
// document in invoice collections against the order
const createInvoice = async (itemId, itemType) => {
    const data = await getParsedInvoiceItem(itemId, itemType);
    if (!data){
        return Promise.reject(new Error(`${itemType} not found`))
    }

    const document = await generateInvoiceDocument(data);
    sendAttachmentForEmailIfRequired(itemId, itemType, document.url).then((data) => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    });

    let invoice = {
        item_id: itemId,
        item_type: itemType,
        url: document.url
    };

    invoice = new DB.invoices(invoice);
    invoice = await invoice.save();
    return {invoice}
};

// function responsible for creating the invoice
// it generate the pdf and returns the URl
const generateInvoiceDocument = () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve({url: "http://meesho.cloudfront.in/invoice.pdf"})
        }, 2000)
    });
};

// get the invoice of the item from the db
const getInvoiceOfAnItem = async (itemId, itemType) => {
    return {invoice: await DB.invoices.findOne({item_id: itemId, item_type: itemType}).lean()};
};

// this function will call the email-service and check for
// if there is an entry for this order
// if there is an entry it indicates that it has send an email without invoice
// otherwise it will call the api from here
const sendAttachmentForEmailIfRequired = async (itemId, itemType, attachment) => {
    const url = `${MS.emailService}email_histories/${itemType}/${itemId}`;
    const response = await requestPromise(url);
    if (response.email_history) {

        const payload = {
            item_id: itemId,
            item_type: itemType,
            attachment
        };

        const options = {
            method: 'POST',
            uri: `${MS.emailService}email_histories`,
            body: payload,
            json: true // Automatically stringifies the body to JSON
        };

        await requestPromise(options)
        return {has_send_email: true}
    }

    return {has_send_email: false}
};

module.exports = {
    createInvoice: createInvoice,
    getInvoiceOfAnItem: getInvoiceOfAnItem
};