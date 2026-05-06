const path = require("path")
const fs = require("fs");



// const fullPath = path.join('/public',  'home');


// fs.mkdir(fullPath, (err)=>{
//     if(err){
//         console.log(err)
//     }
// })

// console.log('Directory name:', __dirname);
// console.log('File name:', __filename);
// console.log('Directory using path.dirname():', path.dirname(__filename));




// Create full file path
const filePath = path.join(__dirname, "public", "images");

// Create file
// fs.writeFile(filePath, "Hello Node.js", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("File Created Successfully");
// });


fs.mkdir(filePath , (err)=>{
    if(err){
        console.log(err)
    }
})