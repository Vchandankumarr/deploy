const express = require("express");
const { Ceratenotesmodel, Createnotemodel } = require("../model/note.model");

const notesrouter = express.Router();

notesrouter.get("/", async (req, res) => {
  try {
    const notes = await Createnotemodel.find();
    res.send(notes);
  } catch (error) {
    res.send("cannot get data");
  }
});

notesrouter.post("/create", async (req, res) => {
  const payload = req.body;
//   console.log(payload);
  try {
    const new_note = Createnotemodel(payload);
    await new_note.save();
    res.send("created new note");
  } catch (error) {
    res.send("cannot create new note");
  }
});

notesrouter.patch("/update/:id", async (req, res) => {

  const payload = req.body;
  const ID = req.params.id;
  const note = await Createnotemodel.findOne({ _id: ID });
  // console.log(note);

  const note_userID = note.userID;
  const userID_jwt = req.body.userID;
  // console.log(ID)
  try {
    if (userID_jwt === note_userID) {
      await Createnotemodel.findByIdAndUpdate({ _id: ID }, payload);
      res.send({message:`updated note`});
    } else {
      res.send({ message: "you are not authorized to update" });
    }
  } catch (error) {
    res.send(`cannot update the given ${ID}`);
  }
});

notesrouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const note=await Createnotemodel.findOne({_id:ID})
  console.log(note)
  const note_userID=note.userID;
  const userID_jwt=req.body.userID
  try {
    if(userID_jwt===note_userID){
        await Createnotemodel.findByIdAndDelete({ _id: ID });
        res.send(`deleted note of id ${ID}`);
    }
    else{
        res.send({"message":"you are not authorized to delete"})
    }
    
  } catch (error) {
    res.send("cannot delete the note");
  }
});

module.exports = {
  notesrouter,
};
