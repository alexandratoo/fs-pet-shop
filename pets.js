'use strict';

const fs = require('fs')
 const path = require('path')
 var petsPath = path.join(__dirname, 'pets.json');

 let node = path.basename(process.argv[0]);
 let file = path.basename(process.argv[1]);
 let cmd = process.argv[2];
 var index = process.argv[3]

 if (cmd === 'read') {
   var ind = process.argv[3]
    fs.readFile('pets.json', 'utf8', function(err, data) {
        if (err) {
          console.error(`USAGE: ${node} ${file} read`);
        } else{
          console.log('success', JSON.parse(data));
          if (ind >= 0 && ind < JSON.parse(data).length) {
            console.log(JSON.parse(data)[ind]);
          } else if (ind !== undefined && typeof ind !== Number){
            console.log(`USAGE: ${node} ${file} read INDEX`);
          }
          else {
            console.log(JSON.parse(data))
          }
        }
      })
    } else if (cmd === 'create'){
      fs.readFile('pets.json', 'utf8', function (err, data){
        if (err){
          console.error(`USAGE: ${node} ${file}create AGE KIND NAME`);
          process.exit(1);
        }
        var age = process.argv[3]
         let kind = process.argv[4]
          let name = process.argv[5]
         let parsedData = JSON.parse(data)
         let petObj = {}
      if (!name){
         console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
 +         process.exit(1)
 }else{
   petObj.age = Number(age);
   petObj.kind = kind;
   petObj.name = name;
   parsedData.push(petObj);
   fs.writeFile('pets.json', JSON.stringify(parsedData), function(writingErr){
     if (writingError){
       throw writingError;
     }
     console.log((petObj));
   })
 }
      })
    }
    else {
      console.error(`Usage: ${node} ${file} [read | create | update | destry]`);
      process.exit(1);
    }
