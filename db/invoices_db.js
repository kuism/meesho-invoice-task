// eslint-disable-next-line prefer-destructuring
const mongoose = require("./__connection").mongoose;

const Schema = mongoose.Schema;

const invoices = Schema({
    item_id: {type: String},
    item_type: {type: String},
    url: {type: String},
    created_at: {type: Number, default: new Date().getTime()/1000}
});

module.exports =  mongoose.model('invoices', invoices);
exports =  mongoose.model('invoices', invoices);