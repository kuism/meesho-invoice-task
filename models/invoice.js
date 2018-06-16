const requestPromise = require("request-promise");

const DB = require("../configs/database");
const MS = require("../configs/config").MicroServices;

const getParsedInvoiceItem = async (itemId, itemType) => {
    let url;
    if (itemType === "order"){
        url = `${MS.orderService}orders/${itemId}.json`;
        let response = await requestPromise(url);
        response = JSON.parse(response);
        return response;
    }
};

const createInvoice = async (itemId, itemType) => {
    const data = await getParsedInvoiceItem(itemId, itemType);
    if (!data){
        return Promise.reject(new Error(`${itemType} not found`))
    }

    const document = await generateInvoiceDocument(data);

    let invoice = {
        item_id: itemId,
        item_type: itemType,
        url: document.url
    };

    invoice = new DB.invoices(invoice);
    invoice = await invoice.save();
    return invoice
};

const generateInvoiceDocument = () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve({url: "http://meesho.cloudfront.in/invoice.pdf"})
        }, 2000)
    });
};

const getInvoiceOfAnItem = async (itemId, itemType) => {
    return {invoice: await DB.invoices.findOne({item_id: itemId, item_type: itemType})};
};

module.exports = {
    createInvoice: createInvoice,
    getInvoiceOfAnItem: getInvoiceOfAnItem
};