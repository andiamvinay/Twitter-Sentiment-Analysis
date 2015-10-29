var express = require('express');
var router = express.Router();
var analyze = require('../app_modules/analyze.js');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/analyze', isLoggedIn, function(req, res, next) {
	res.render('analyze')
});

router.get('/sentiAnalyze', isLoggedIn, function(req, res, next) {
	analyze.getTweets(req.query.q,function(result){
		if(result.isError){
			console.log(result.error)
			res.send("Error");
		}else{
			res.send(JSON.stringify(analyze.performAnalysis(result.tweetSet)));
		}	
	});
});

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/analyze',
				failureRedirect : '/'
}));

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
