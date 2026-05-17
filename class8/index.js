import express from "express"
import jwt from "jsonwebtoken"
import products from "./data/data.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res)=>{
    res.send("api running")
})
// querry, params, jwt 


app.get("/search", (req, res)=>{
    const value = req.query.id
    const data = products.filter((obj)=> obj.category.includes(value) )  
    res.send(data)  
})

app.get("/product/:slug", (req, res) => {
  const { slug } = req.params;

  const data = products.find(
    (obj) => obj.slug === slug
  );

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.status(200).json({
    success: true,
    product: data
  });
});


app.listen(3001, ()=>{
    console.log("server running")
})