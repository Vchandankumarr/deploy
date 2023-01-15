const express=require("express")
const {connection}=require("./config/db")
require("dotenv").config
const{userrouter}=require("./routee/user.router")
const{notesrouter}=require("./routee/notes.router")
const{authentication}=require("./middleware/authenticate.middleware")
const cors = require('cors')


const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>
{
    res.send("welcome to home page")
})

app.use("/users",userrouter)
app.use(authentication)
app.use("/notes",notesrouter)



app.listen(process.env.port, async()=>
{
    try {
        await connection
        console.log("connected to data base")
    } catch (error) {
        console.log(error)
    }
console.log(`server is running at port ${process.env.port}`)
})