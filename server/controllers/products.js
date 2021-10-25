const express = require('express')
const router = express.Router()
const products = require('../models/products');

router.get('/', (req, res, next) => {
    products.getAll()
        .then(x => { res.send(x) })
        .catch(next)
})

module.exports = router;