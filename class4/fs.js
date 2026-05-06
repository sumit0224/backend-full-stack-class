const express = require("express");
const app = express()
const fs = require("fs");


app.use(express.json());
app.get('/', (req, res)=>{
    res.json({stauts: "api running "})
})

app.post("/create", async(req, res)=>{
    const {fileName , content} = req.body
    try {
        await fs.writeFile(fileName, content, ()=>{
            console.log("file created success")
        })
        return res.json({message: "file created"})
        
    } catch (error) {
        console.error(error);
        res.json({message: "server error"})
    }
})
app.get('/read', (req, res)=>{

    try {
         fs.readFile("app.js", "utf8", (err, data)=>{
            try {
                res.json({data})
            } catch (error) {
                res.json({err}) 
            }
         })    
    } catch (error) {
        console.error(error);
        res.json({message: "server error"})
    }
})

// fs.appendFileSync("app.js", "hello update done")

// fs.appendFile("app.pdf", "hello", (err)=>{
//     if(err){
//         console.log(err)
//     }
// })

fs.rmdir("public", (err)=>{
    if(err){
        console.log(err)
    }
})
app.listen(3000, ()=>{
    console.log("server running ")
})


