import fs from "fs";



fs.writeFile("hello.txt", "\n hello bhaiyo new data add", (err, res)=>{
    if(err){
        console.log(err, "file write err")
    }
    

})

fs.readFile("hello.txt", "utf8", (err, data)=>{
    if (err){
        console.log(err, "file err")

    }
    console.log(data)

})

console.log("file reading start .....")