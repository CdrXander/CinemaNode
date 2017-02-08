var app 	 	= require('./../server.js');
var config 	 	= require('./../config.js');
var defaults 	= require('./../defaults.js');
var sd 		 	= defaults.shelf;
var crypto 		= require('crypto');

module.exports = {
	loginUserFB:loginUserFB,
	getCurrentUser:getCurrentUser,
	createUser:createUser,
	loginUser:loginUser
}


function generateSalt(length) {
	return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}


function loginUserFB(req,res,next) {
	
	var db = app.get('db');

	db.get_user_by_fb_id([req.user.id], function(err, user) {
		if(!err) {
			if(user.length <1) {
				createFacebookUser(req.user, req, res);

			} else {
				req.session.currentUser = user[0];
				res.status(200).redirect('/');
			}
		} else {
			res.status(500).send(err);
		}
	})
	
}


function createFacebookUser(fbuser,req, res) {
	var db = app.get('db');
	var fname = fbuser.displayName.split(" ")[0];
	var lname = fbuser.displayName.split(" ")[1];

	db.users.insert( 
	{
		fb_user_id: fbuser.id,
		first_name: fname,
		last_name: lname,
		photo_url: fbuser.photos[0].value,
		join_date: new Date()
	}, 
	function(err, user) {
		if(!err) {
			createBasicShelf(req, user, sd.ownName, sd.ownSum, "own_shelf_id");
			createBasicShelf(req, user, sd.watchName, sd.watchSum, 'watch_shelf_id');
			createBasicShelf(req, user, sd.seenName, sd.seenSum, 'seen_shelf_id', function(res){res.status(200).redirect('/')}, res);
		} else {
			res.status(500).send(err);
		}
	})


}


function createUser(req,res) {
	var db = app.get('db');
	var salt = generateSalt(20);
	var hash = crypto.createHmac('sha512', salt);
	hash.update(req.body.password);
	var passwordHash = hash.digest('hex');

	db.users.find({email:req.body.email}, function(err, result) {
		if(!err) {
			if(result.length > 0) {
				res.status(422).send("Account already exists for that email address");
			} else {
				var newUser = req.body;
				newUser.password_salt = salt;
				newUser.join_date = new Date()
				newUser.password = passwordHash;

				db.users.insert(newUser, function(err, user) {
					if(!err) {
						createBasicShelf(req, user, sd.ownName, sd.ownSum, "own_shelf_id");
						createBasicShelf(req, user, sd.watchName, sd.watchSum, 'watch_shelf_id');
						createBasicShelf(req, user, sd.seenName, sd.seenSum, 'seen_shelf_id', function(res){res.status(200).redirect('/')}, res);
					} else {
						res.status(500).send(err);
					}
				})
			}
		}
	})
}


function loginUser(req, res) {
	var db = app.get('db');

	var loginData = {
		email: req.body.email
	}
	db.users.find(loginData, function(err,result) {
		if(!err) {
			if(result.length < 1) {
				res.status(422).send("Incorrect email/password combination");
			} else {
				console.log(result[0]);
				var salt = result[0].password_salt;
				var hash = crypto.createHmac('sha512', salt);
				hash.update(req.body.password);
				var passwordHash = hash.digest('hex');

				if(passwordHash === result[0].password) {
					delete result[0].password;
					delete result[0].password_salt
					req.session.currentUser = result[0];
					// res.status(200).send(req.session.currentUser);
					res.status(200).redirect('/');
				} else {
					res.status(422).send("Incorrect email/password combination");
				}
			}
		}
	})	
}

function createBasicShelf(req, user, name, summary,shelf_col, send, res) {
	var db = app.get('db');
	db.shelf.insert(
		{
			user_id: user.user_id, 
			name: name, 
			summary: summary, 
			create_date: new Date()
		}, 
	function(err, shelf) {
		db.users.update({user_id:user.user_id,[shelf_col]:shelf.shelf_id}, function(err,user) {
			if(!err) {
				delete user.password;
				delete user.password_salt;
				req.session.currentUser = user;
				if(!!send) {
					send(res);
				}
			} else {
				res.status(500).send(err);
			}
		})
	})
}


//GET current user
function getCurrentUser(req,res,next) {

	if(!!req.session.currentUser) {
		res.status(200).send(req.session.currentUser);
	} else {
		res.status(200).send();
	}
}