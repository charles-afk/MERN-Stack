const express = require('express')
const path = require('path');
require('dotenv').config()

const users = require('./controllers/users')
const message = require('./controllers/message')
const products = require('./controllers/products')
const categories = require('./controllers/categories')
const purchase = require('./controllers/purchase')
const receipt = require('./controllers/receipt')

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(express.json());
app.use(express.static(__dirname + '/../client/build'));

app.use(function(req, res, next) {
  const arr = (req.headers.authorization || "").split(" ");
  if(arr.length > 1 && arr[1] != null){
      req.userId = +arr[1];
  }
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users', users);
app.use('/message', message);
app.use('/products', products);
app.use('/categories', categories);
app.use('/purchase', purchase);
app.use('/receipt', receipt);

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '/../client/build', 'index.html'));
})

app.use( (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({message: err.message})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})