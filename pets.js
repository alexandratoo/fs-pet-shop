'use strict'

 var fs = require('fs')
 var path = require('path')
 var petsPath = path.join(__dirname, 'pets.json');

 var node = path.basename(process.argv[0]);
 var file = path.basename(process.argv[1]);
 var cmd = process.argv[2];
 var index = process.argv[3]
 if (cmd === 'read') {
   fs.readFile("pets.json", 'utf8', (err, data) => {
     if (err) {
       throw err;
     }
     else if (index < 0 || index > JSON.parse(data).length-1) {
       console.log(`USAGE node pets.js read INDEX`);
       process.exit(1);
     } else if (index === undefined){
       console.log(JSON.parse(data));
     } else {
     console.log(JSON.parse(data)[index]);
     }
   });
 }
 else if (cmd === 'create') {
   fs.readFile('pets.json', 'utf8', function(err, data) {
     if (err) {
       throw err;
     }
     let newPetParse = JSON.parse(data)
     let newPet = {
       'age': parseInt(process.argv[3]),
       'kind': process.argv[4],
       'name': process.argv[5]
     }
     if (process.argv.length !=6){
       console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
       process.exit(1);
     }

     newPetParse.push(newPet)

     let newPets = JSON.stringify(newPetParse)

     fs.writeFile('pets.json', newPets, function(err){
       if (err) {
         throw err
       }
       console.log(newPet);
     })
   });
 }
 else {
   console.error(`Usage: node ${file} [read | create | update | destroy]`);
   process.exit(1);
 }
 // if (cmd === 'read') {
 //    fs.readFile('pets.json', 'utf8', function(err, data) {
 //        if (err) {
 //            throw err;
 //         }
 //
 //
 //         if (JSON.parse(data)[index] === undefined) {
 //             console.error(`Usage: ${node} ${file} read INDEX`)
 //        }
 //         else if (index) {
 //             console.log(JSON.parse(data)[index]);
 //         } else {
 //             console.log(JSON.parse(data));
 //         }
 //     });
 // } else if (cmd === 'create') {
 //     fs.readFile(petsPath, 'utf8', function(readErr, data) {
 //         if (readErr) {
 //             throw readErr;
 //         }
 //
 //         var pets = JSON.parse(data)
 //         var age = Number(process.argv[3]);
 //         var kind = process.argv[4]
 //        var name = process.argv[5]
 //
 //        var pet = {
 //             age: age,
 //             kind: kind,
 //             name: name
 //         }
 //
 //         if (!age || !kind || !name) {
 //             console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
 //             process.exit(1);
 //         }
 //
 //         pets.push(pet)
 //
 //         var petsJSON = JSON.stringify(pets)
 //
 //        fs.writeFile(petsPath, petsJSON, function(writeErr) {
 //             if (writeErr) {
 //                 throw writeErr
 //            }
 //
 //             console.log(pet)
 //         });
 //     });
 // } else {
 //     console.error(`Usage: ${node} ${file} [read | create | update | destroy]`)
 //     process.exit(1)
 // }
