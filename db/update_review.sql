UPDATE review
SET review_text = $3, user_rating = $4
WHERE user_id = $1 AND movie_id = $2;