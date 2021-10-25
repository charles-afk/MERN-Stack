const express = require('express')
const router = express.Router()
const users = require('../models/users');

router.get('/', (req, res, next) => {
    users.getAll()
        .then(x => res.send(x))
        .catch(next);

}).get('/:id', (req, res, next) => {
    const id = +req.params.id;
    if(!id) return next();
    users.get(id)
        .then(x => res.send(x))
        .catch(next);

}).get('/search', (req, res, next) => {
    users.search(req.query.q)
        .then(x => res.send(x))
        .catch(next);

}).post('/', (req, res, next) => {
    users.add(
            req.body.username,
            req.body.password,
            req.body.first_name, 
            req.body.last_name,
            req.body.email
        ).then(newUser=> {
            res.send(newUser);
        }).catch(next)

}).post('/exists', (req, res, next) => {
    users.getEmail( req.body.email )
        .then(x => res.send(x))
        .catch(next)
    
}).post('/register', (req, res, next) => {
    users.register(
            req.body.username,
            req.body.password,
            req.body.first_name, 
            req.body.last_name,
            req.body.email
        ).then(newUser=> {
            res.send({ ...newUser, password: undefined });
        }).catch(next)

}).post('/login', (req, res, next) => {
    users.login(
            req.body.email, 
            req.body.password,
        ).then(newUser=> {
            res.send({ ...newUser, password: undefined });
        }).catch(next)

})

module.exports = router;