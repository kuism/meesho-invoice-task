// my_queue_worker.js

var Queue = require('firebase-queue'),
    config = require('./../config/config');

var refQueue = config.FIREBASE_ADMIN.database().ref(config.FB_QUEUE_PATH);


console.log("worker started");

var queue = new Queue(refQueue, function(data, progress, resolve, reject) {
    console.log(data);
    Logic.updateBeaconLogAndSetUser(data, function (err) { });

    // Finish the task asynchronously
    setTimeout(function() {
        resolve();
    }, 1000);
});
