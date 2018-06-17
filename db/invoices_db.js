// eslint-disable-next-line prefer-destructuring
const mongoose = require("./__connection").mongoose;

const Schema = mongoose.Schema;

const invoices = Schema({
    item_id: {type: String}, // id of the item
    item_type: {type: String}, // the type of the item, Eg: Order
    url: {type: String}, // invoice url
    created_at: {type: Number, default: new Date().getTime()/1000}
});

module.exports =  mongoose.model('invoices', invoices);
exports =  mongoose.model('invoices', invoices);