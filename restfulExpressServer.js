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
fs.readFile('pets.json', 'utf8', (err, petsJSON)=> {
  let pets = JSON.parse(petsJSON)

 app.post('/pets', function(req, res) {
   var pet = req.body;

   if (!pets) {
     return res.sendStatus(400);
   }

   pets.push(pet);

   res.send(pet);
 });
 app.get('/pets/:index', function(req, res) {
  res.send(pet);
});

app.patch('/pets:index', function(req, res){
  if (Number.isNaN(index) || index < 0 || index >= pets.length) {

  }
  let pet = req.body;
  if(!pet){
      return res.sendStatus(404);
  }

})
app.delete('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  var pet = pets.splice(index, 1)[0];

  res.send(pet);
});
})
app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
 module.exports = app;
