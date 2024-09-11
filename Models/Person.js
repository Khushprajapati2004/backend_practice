const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//  Definne the person's schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ["chef","manager","waiter"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//pre is the middleware function that is called before save data in database
personSchema.pre('save',async function(next) {
    const person = this;

    // Hash the password only if it has been modified( or is new)
    if(!person.isModified('password'))  return next();
    try {
        //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with the hash one
        person.password = hashPassword;
        next();
    } catch (err) {
        return next(err);    }
    
});


personSchema.methods.comparePassword = async function(candidatePassword) {
    try {

        // Check if the candidatePassword or stored password is undefined
        if (!candidatePassword || !this.password) {
            throw new Error('Password or stored hash is missing');
        }
        // Use to bcrypt provided password with the hash password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
            return isMatch;
    } catch (err) {
        throw(err);
    }
}

//Create person model 
const Person = mongoose.model('person', personSchema);
module.exports =  Person; 