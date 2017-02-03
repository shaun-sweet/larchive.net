var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
require('../app/models/user');
var User = mongoose.model('User');
var configAuth = require('./auth');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'picture.type(large)']
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        var fb = profile._json;
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'username' : fb.email }, function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                  // console.log(user);
                  // console.log(user);
                    user.facebook.token = token;
                    user.save();
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();
                    var facebook = {};
                    facebook.id = fb.id;
                    facebook.token = token;
                    facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook = facebook;
                    newUser.pictureUrl = fb.picture.data.url;
                    newUser.username = fb.email;
                    // newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    // console.log(newUser);
                    // save our user to the database
                    console.log(facebook);
                    // console.log("Prior to save: ", newUser);
                    newUser.save(function(err) {

                        if (err)
                            throw err;
                        // if successful, return the new user
                        console.log(newUser);
                        return done(null, newUser);
                    });
                }

            });
        });

    }));

};
