var app 	 = require('./../server.js');
var config 	 = require('./../config.js');
var defaults = require('./../defaults.js');
var sd 		 = defaults.shelf;

module.exports = {
	loginUserFB:loginUserFB
}


function loginUserFB(req,res,next) {
	
	var db = app.get('db');


	db.get_user_by_fb_id([req.user.id], function(err, user) {
		if(!err) {
			if(user.length <1) {
				req.session.currentUser = createUser(req.user, req, res);

			} else {
				req.session.currentUser = user[0];
				res.status(200).redirect('/');
			}
		} else {
			res.status(500).send(err);
		}
	})
	
}


function createUser(fbuser,req, res) {
	var db = app.get('db');
	var fname = fbuser.displayName.split(" ")[0];
	var lname = fbuser.displayName.split(" ")[1];

	db.users.insert( 
	{
		fb_user_id: fbuser.id,
		first_name: fname,
		last_name: lname,
		photo_url: "http://graph.facebook.com/" + fbuser.id,
		join_date: new Date()
	}, 
	function(err, user) {
		if(!err) {
			console.log(user);
			createBasicShelf(req, user, sd.ownName, sd.ownSum, "own_shelf_id");
			createBasicShelf(req, user, sd.watchName, sd.watchSum, 'watch_shelf_id');
			createBasicShelf(req, user, sd.seenName, sd.seenSum, 'seen_shelf_id', function(res){res.status(200).redirect('/')}, res);
		} else {
			res.status(500).send(err);
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
				req.session.currentUser = user[0];
				if(!!send) {
					send(res);
				}
			} else {
				res.status(500).send(err);
			}
		})
	})
}