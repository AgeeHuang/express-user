var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        // When a user tries to sign in this code runs.
        db.User.findOne({
            where: {
                email,
            },
        })
        .then(function(dbUser) {
            // If there's no user with the given email.
            if (!dbUser) {
                return done(null, false, {
                    message: 'Incorrect email.',
                });
            }
            
            // If the password is wrong.
            if (!dbUser.validPassword(password)) {
                return done(null, flase, {
                    message: 'Incorrect password.'
                })
            }
            // If none of the above, return the user.
            return done(null, dbUser);
        })
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;