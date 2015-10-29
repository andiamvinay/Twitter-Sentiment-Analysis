var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var configAuth = require('./auth.js');
var User = require('./userModel.js').User;

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });

passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterConfig.consumerKey,
        consumerSecret  : configAuth.twitterConfig.consumerSecret,
        callbackURL     : configAuth.twitterConfig.callbackURL

    },
    function(token, tokenSecret, profile, done) {

        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'iid' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.iid          = profile.id;
                    newUser.token       = token;
                    newUser.username    = profile.username;
                    newUser.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    });

    }));