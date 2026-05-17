import http from "http";
import app from "./src/app.js"
const server = http.createServer(app);


const PORT = 3000 
server.listen(PORT, ()=>{
    console.log(`server runing on http://localhost:${PORT}`)
})

