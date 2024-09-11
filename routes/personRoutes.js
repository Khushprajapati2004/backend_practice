const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const Person = require("../Models/Person");

//GET METHOD
router.get("/", jwtAuthMiddleware , async (req, res) => {
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
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username : response.username
    } 

    const token = generateToken(payload);
    console.log('Token is: ', token);
    

    res.status(200).json({response:response, token:token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

router.post('/login', async(req,res)=> {
  try {
    const {username,password} = req.body;

    const user = await Person.findOne({username: username});

    if( !user || !(await user.comparePassword(password))) {
      res.status(401).json({Error: 'Inavalid username or password'});
    }

    const payload = {
      id: user.id,
      username: user.username
    }

    const token = generateToken(payload);

    res.json(token);
  } catch (err) {
      console.log(err);
      res.status(500).json({Error: 'Internal server error'});
  }
})

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