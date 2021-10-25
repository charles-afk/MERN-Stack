const express = require('express')
const router = express.Router()
const categories = require('../models/categories');

router.post('/choice', (req, res, next) => {
    categories.get(
        req.body.condition,
        req.body.format,
        req.body.language,
        req.body.nonstock,
        req.body.publisher,
        req.body.rating,
        req.body.series
    ).then(x => res.send(x))
    .catch(next)
})

module.exports = router;