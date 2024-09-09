const mongoose = require("mongoose");
require('dotenv').config();

const mongoURL= process.env.MONGOURL;

// Set up mongoDB connection 
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: false
});

//mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define the event listner for database connection

db.on('connected', ()=> {
    console.log("Connected to mogoDB server");
});

db.on('error', (err)=> {
    console.log("MongoDB connection error", err);
});

db.on('disconnected', () => {
    console.log("Disconnected to mongoDB server");
});


//Export the database connection 
module.exports = db;
