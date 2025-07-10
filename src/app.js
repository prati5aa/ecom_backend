
const cors = require("cors")
const path=require("path")
const uploadDir = path.join(__dirname, '../uploads');

const dotenv=require("dotenv")
const router=require("./routes/index")
dotenv.config()
const express=require("express")
const { handleError } = require("./utils/handleError")
const app=express()

app.get("/",(req,res)=>{
    res.send("serve is listing")
})
app.use(cors())
app.use(express.json())

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));

app.use("/api/v1",router)

app.get("/api/v1",(req,res)=>{
    res.send("serve is listing at /api/v1")
})
app.use(handleError)


module.exports=app
