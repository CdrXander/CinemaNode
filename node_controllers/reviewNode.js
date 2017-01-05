var app 		= require('./../server.js');
var defaults 	= require('./../defaults.js');

module.exports = {
	saveReview:saveReview,
	getReviewForUser:getReviewForUser,
	getReviewsForMovie:getReviewsForMovie
}

function saveReview(req,res,next) {
	var db = app.get('db');

 	db.review.find({
 		user_id: req.session.currentUser.user_id,
 		movie_id: req.body.movie_id
 	}, function(err, reviews) {
 		if(!err) {
		 	var newReview = {
				user_id: req.session.currentUser.user_id,
				movie_id: req.body.movie_id,
				review_text: req.body.review_text,
				user_rating: req.body.user_rating
			}
			if(reviews.length < 1) {
				db.review.insert(newReview,function(err, review) {
					if(!err) {
						res.status(200).send(review);
					} else {
						console.log("reviewNode.createReview.insert");
						console.log(err);
						res.status(500).send("error");
					}
				});	
 			} else {
 				db.update_review([
 					req.session.currentUser.user_id, req.body.movie_id, req.body.review_text, req.body.user_rating
 				], function(err, review) {
					if(!err) {
						res.status(200).send(review);
					} else {
						console.log("reviewNode.createReview.update");
						console.log(err);
						res.status(500).send("error");
					}
				});	
 			}
 		} else {
 			console.log("reviewNode.createReview");
			console.log(err);
 			res.status(500).send();
 		}
 	})
}

function getReviewForUser(req,res,next) {
	var db = app.get('db');
	db.review.find({
		user_id: req.session.currentUser.user_id,
 		movie_id: req.params.mid
	}, function(err, review) {
		if(!err) {
			res.status(200).send(review);
		} else {
			console.log("reviewNode.getReviewForUser");
			console.log(err);
 			res.status(500).send();
		}
	})
}

function getReviewsForMovie(req,res,next) {
	var db = app.get('db');
	db.get_review_with_author_data([req.params.mid], function(err, reviews) {
		if(!err) {
			res.status(200).send(reviews);
		} else {
			console.log("reviewNode.getReviewsForMovie\n");
			console.log(err);
			res.status(500).send(err);
		}
	})
}