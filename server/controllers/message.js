const express = require('express')
const router = express.Router()
const message = require('../models/message');

router.get('/', (req, res, next) => {
    message.getAll()
        .then(x => res.send(x))
        .catch(next);

}).post('/info', (req, res, next) => {
    message.messageMe(
        req.body.name,
        req.body.email,
        req.body.text
    ).then(newMessage => res.send(newMessage)
    ).catch(next)
})

module.exports = router;