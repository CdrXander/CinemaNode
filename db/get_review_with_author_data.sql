SELECT u.first_name, u.last_name, u.photo_url, r.review_text, r.user_rating 
FROM review r
JOIN users u ON u.user_id = r.user_id 
WHERE r.movie_id = $1;