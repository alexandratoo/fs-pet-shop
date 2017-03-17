'use strict';

 const fs = require('fs');
 const path = require('path');
 const petsPath = path.join(__dirname, 'pets.json');

 const express = require('express');
 var app = express();
 var port = process.env.PORT || 8000;
 var morgan = require('morgan');
 var bodyParser = require('body-parser');

 app.disable('x-powered-by');
 app.use(morgan('short'));
 app.use(bodyParser.json());

 app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
     if (err) {
       console.error(err.stack);
      return res.sendStatus(500);
    }

     var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
 });

 app.get('/pets/:id', function(req, res) {
   fs.readFile(petsPath, 'utf8', function(err, petsJSON) {

     if (err) {
       console.error(err.stack);
       return res.sendStatus(500);
     }

     var id = Number.parseInt(req.params.id);
     var pets = JSON.parse(petsJSON);

     if (id < 0 || id >= pets.length || Number.isNaN(id)) {
       return res.sendStatus(404);
    }

     res.set('json');
     res.send(pets[id]);
   });
 });


 app.post('/pets', function(req, res) {
   fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
     if (readErr) {
       return res.sendStatus(500);
     }

     var pets = JSON.parse(petsJSON);
    var pet = req.body;

     if (!pet) {
       return res.sendStatus(400);
     }
    //  res.set('json');
     pets.push(pet);

     var newPetsJSON = JSON.stringify(pets);

     fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
       if (writeErr) {
        //  console.error(writeErr.stack);
         return res.sendStatus(500);
       }

       res.set('json');
      console.log(pet);
       res.send(pet);
     });
   });
 });
 app.patch('/pets/:id', function(req, res) {
   fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {

      return res.sendStatus(500);
     }

     var id = Number.parseInt(req.params.id);
     var pets = JSON.parse(petsJSON);

     if (id < 0 || id >= pets.length || Number.isNaN(id)) {
       return res.sendStatus(404);
     }

     var pet = req.body.name;

     if (!pet) {
       return res.sendStatus(400);
     }

     pets[id] = pet;

     var newPetsJSON = JSON.stringify(pets);

     fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
       if (writeErr) {
         return res.sendStatus(500);
       }

       res.set('json');

       res.send(pet);
     });
  });
 });

 app.delete('/pets/:id', function(req, res) {
   fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
     if (readErr) {

      return res.sendStatus(500);
     }

     var id = Number.parseInt(req.params.id);
     var pets = JSON.parse(petsJSON);

   if (id < 0 || id >= pets.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var pet = pets.splice(id, 1)[0];
     var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
       if (writeErr) {
        return res.sendStatus(500);
      }

      res.set('json');
      res.send(pet);
     });
   });
 });


 app.use(function(req, res) {
   res.sendStatus(404);
 });

 app.listen(port, function() {
   console.log('Listening on port', port);
 });
//
// fs.readFile('pets.json', 'utf8', (err, petsJSON)=> {
//   let pets = JSON.parse(petsJSON)
//
//   app.get('/pets/:index', function(req, res) {
//     var index = Number.parseInt(req.params.index);
//
//     if (Number.isNaN(index) || index < 0 || index >= pets.length) {
//       return res.sendStatus(404);
//     }
//
//     res.send(pets[index]);
//   });
//   app.post('/pets', function(req, res) {
//   var pet = req.body;
//
//   if (!pet) {
//     return res.sendStatus(400);
//   }
//
//   pets.push(pets);
//
//   res.send(JSON.parse(pet));
// });
// app.put('/pets/:index', function(req, res) {
//   var index = Number.parseInt(req.params.index);
//
//   if (Number.isNaN(index) || index < 0 || index >= petss.length) {
//     return res.sendStatus(404);
//   }
//
//   var pet = req.body;
//
//   if (!pet) {
//     return res.sendStatus(400);
//   }
//
//   petss[index] = pet;
//
//   res.send(JSON.parse(pet));
// });
//
// })

// })
 module.exports = app;
