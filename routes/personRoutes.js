const express = require("express");
const router = express.Router();

const Person = require("../Models/Person");

//GET METHOD
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Successfullly get the data");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// POST  METHOD
router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// Get data using the parameter
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Invalid workType" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// UPDATE PERSON DATA   
router.put('/:id', async(req,res)=> {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updateData ,{
            new: true, //Return the update document
            runValidators: true // Run mongoose validators
        });
        console.log('data updated');
        res.status(200).json(response);

        if(!response) {
            res.status(404).json({Error: 'Person not found'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({Error: 'Internal server error'});
    }
});

//DELETE PERSON DATA 
router.delete('/:id', async(req,res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            res.status(404).json({Error: 'Person not founnd'});
        }
        else {
            console.log('data deleted');
            res.status(200).json({message: "person deleted successfully"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({Error: "Internal server error"})        
    }
});

module.exports = router;