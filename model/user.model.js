const mongoose=require("mongoose")



CreateSchema=mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    password:String,
   
})


Createusermodel=mongoose.model("user",CreateSchema)

module.exports={
    Createusermodel
}