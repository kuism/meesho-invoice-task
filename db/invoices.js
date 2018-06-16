// eslint-disable-next-line prefer-destructuring
const mongoose = require("./__connection").mongoose;

const {Schema} = mongoose;

const pages = Schema({
    access_token: {type: String},
    admins: {type: [Schema.ObjectId]},
    bot_id: {type: Schema.ObjectId},
    bot_title: {type: String},
    has_enough_perms: {type: Boolean},
    owner: {type: Schema.ObjectId, ref: "users"},
    page_id: {type: String, required: true},
    picture: {type: String},
    title: {type: String, required: true},
    username: {type: String}
});

module.exports =  mongoose.model('pages', pages);
exports =  mongoose.model('pages', pages);