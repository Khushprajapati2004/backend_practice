const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 4000;


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session:false});

app.get("/", (req, res) => {
  res.send("server is on");
});



// import Routers
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


// use router
app.use('/person', personRoutes);
app.use('/menuItem', menuRoutes);



app.listen(PORT, () => {
  console.log("Server listening on port 4000");
});
