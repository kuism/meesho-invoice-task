exports.MONGO_URL = process.env.MONGO_INVOICE_SERVICE_URL || 'mongodb://127.0.0.1:27017/invoice-service';

var firebaseAdmin = require("firebase-admin");
var serviceAccount = require("./meesho-task-queue");

exports.FIREBASE_ADMIN = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL:"https://pole-beacons-73594.firebaseio.com/"
});

exports.FB_QUEUE_PATH = process.env.FB_QUEUE_PATH || "invoice-service";