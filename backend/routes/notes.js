const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note"); // Ensure Note is the correct model name
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get all the notes using GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); // Corrected to Note
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    });

// ROUTE 2 : Add a new note using POST "/api/notes/addnote". login required
router.post("/addnote", fetchuser,
[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description length should be at least 5").isLength({
    min: 5,
    }),
],
async (req, res) => {
    try {
    const { title, description, tag } = req.body;
    // If any error occurred, return Bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
    });
    const saveNote = await note.save();
    res.json(saveNote);
    
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
}
);

// ROUTE 3 : Update an existing notes using PUT "/api/notes/updatenote". login required
router.put('/Updatenote/:id', fetchuser, async (req, res) => {
    const{title, description, tag} = req.body;

    try {     
        //create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")};
        //check if the user owns the note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")};
        
        note =  await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
)

// ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
    
        // Allow deletion only if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
    
        await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
