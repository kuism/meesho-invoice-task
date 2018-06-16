// my_queue_worker.js

const Queue = require('firebase-queue'),
    config = require('../configs/config');

const Invoice = require("../models/invoice");

var refQueue = config.FIREBASE_ADMIN.database().ref(config.FB_QUEUE_PATH);


console.log("worker started");

const queue = new Queue(refQueue, function (data, progress, resolve, reject) {
    console.log(data);

    switch (data.channel){
        case "create-order":
            Invoice.createInvoice(data.order_id, "order")
            break;
        default:

    }

    // Finish the task asynchronously
    setTimeout(function() {
        resolve();
    }, 1000);
});
