const express = require('express');

const router = express.Router();
const Invoice = require("../models/invoice");

router.get("/:item_type/:item_id", async(req, res) => {
    Invoice.getInvoiceOfAnItem(req.params.item_id, req.params.item_type).then((data) => {
        res.send(data)
    })
    .catch((err => {
        res.status(400);
        res.send({data: err, success: false})
    }))
});


module.exports = router;