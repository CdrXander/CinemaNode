SELECT sm.shelf_id FROM shelf_movie sm
JOIN shelf s ON s.shelf_id = sm.shelf_id 
WHERE s.user_id = $1 AND sm.movie_id = $2