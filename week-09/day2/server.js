'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database_requests.js');

var app = express();

app.use(logRequest);
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/todos', function (req, res) {
  database.getItems(function (allItems) {
    res.status(200).json(allItems);
  });
});

app.post('/todos', function (req, res) {
  var attributes = req.body;
  database.addItem(attributes, function (newItem) {
    res.status(200).json(newItem);
  });
});

app.put('/todos/:id', function (req, res) {
  var id = req.params.id
  var attributes = req.body;
  database.updateItem(id, attributes, function (updatedItem) {
    res.status(200).json(updatedItem);
  });
});

app.delete('/todos/:id', function (req, res) {
  var id = req.params.id;
  database.removeItem(id, function (removedItem) {
    res.status(200).json(removedItem);
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000...')
});

function logRequest(req, res, next) {
  var parts = [
    new Date(),
    req.method,
    req.originalUrl,
  ];
  console.log(parts.join(' '));
  next();
}
