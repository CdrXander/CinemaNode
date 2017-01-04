var app 		= require('./../server.js');
var defaults 	= require('./../defaults.js');

module.exports = {
	createReview:createReview,
	getReview:getReview,
	getReviewsForMovie:getReviewsForMovie
}

function createReview(req,res,next) {
	var db = app.get('db');
	var newReview = {
		user_id: req.body.user_id,
		movie_id: req.body.movie_id,
		review_text: req.body.review_text,
		user_rating: req.body.user_rating
	}
	console.log(newReview);
	db.review.save(newReview,function(err, review) {
		if(!err) {
			console.log(review);
			res.status(200).send(review);
		} else {
			console.log("reviewNode.createReview");
			console.log(err);
			res.status(500).send("error");
		}
	});
}

function getReview(req,res,next) {
	res.status(501).send("Method not Implemented");
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