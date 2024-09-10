const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person');

passport.use(new localStrategy(async(userName,password,done)=> {
    // Authentication logic here
    try {
        // console.log('Recrived Credentials :', userName, password);
        const user = await Person.findOne({username:userName});

        if(!user) {
            return done(null, false, {message: 'Incorrect username'});
        }

        const isPasswordMatch = user.password === password ? true : false;
        if(isPasswordMatch) {
            return done(null, user);
        }
        else{
            return done(null, false, {message: 'Incorrect Password'});
        }
        
    } catch (err) {
        return done(err);
    }
}));

module.exports =passport;