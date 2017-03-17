'use strict'
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
app.use(morgan('short'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
let petsPath = path.join(__dirname, 'pets.json');

 app.disable('x-powered-by');

 app.post('/pets', function(req, res) {
   var pet = req.body;

   if (!pets) {
     return res.sendStatus(400);
   }

   pets.push(pet);

   res.send(pet);
 });
 app.get('/pets/:3', function(req, res) {
  res.send(pets);
});

app.patch('/pets:index', function(req, res){
  if (Number.isNaN(age) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

})
app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
 module.exports = app;
