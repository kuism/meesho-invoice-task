const requestPromise = require("request-promise");

const DB = require("../configs/database");
const MS = require("../configs/config").MicroServices;

const getParsedInvoiceItem = async (itemId, itemType) => {
    let url;

    switch (itemType) {
        case "Order":
            url = `${MS.orderService}orders/${itemId}`;
            let response = await requestPromise(url);
            response = JSON.parse(response);
            return response;
        default:

    }
    return ""
};

const createInvoice = async (itemId, itemType) => {
    let data = await getParsedInvoiceItem(itemId, itemType);
    let document = await generateInvoiceDcument(data);

    let invoice = {
        item_id: itemId,
        item_type: itemType,
        url: document.url
    };

    invoice = new DB.invoices(invoice);
    invoice = await invoice.save();
    return invoice
};

const generateInvoiceDcument = () => {
   return {url: "http://meesho.cloudfront.in/invoice.pdf"};
};

module.exports = {
    createInvoice: createInvoice
};