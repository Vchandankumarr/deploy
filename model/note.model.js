const mongoose=require("mongoose")

CreateNoteSchema=mongoose.Schema({
        title:String,
        note:String,
        author:String,
        category:String,
        userID:String
})


Createnotemodel=mongoose.model("note",CreateNoteSchema)

module.exports={
    Createnotemodel
}