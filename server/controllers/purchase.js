const express = require('express')
const router = express.Router()
const purchase = require('../models/purchase');

router.post('/', (req, res, next) => {
    purchase.pay(
        req.body.amountTotal,
        req.body.card,
        req.body.expire,
        req.body.items,
        req.body.itemsPrice,
        req.body.name,
        req.body.secure,
        req.body.shippingAddress,
        req.body.shippingCity,
        req.body.shippingPrice,
        req.body.shippingState,
        req.body.shippingZipcode,
        req.body.taxPrice,
        req.body.user_id
    ).then(x => res.send(x))
    .catch(next)
})

module.exports = router;