const express = require('express')
const router = express.Router()
const receipt = require('../models/receipt');

router.post('/', (req, res, next) => {
    receipt.getAll(req.body)
        .then(x => res.send(x))
        .catch(next)
})

module.exports = router;