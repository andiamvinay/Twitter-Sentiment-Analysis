var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	iid : String,
	token: String,
	username: String,
	displayName : String
});

var User = mongoose.model('User', userSchema);

exports.User = User;