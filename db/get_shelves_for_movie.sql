SELECT sm.shelf_id FROM shelf_movie sm
JOIN shelf s ON s.shelf_id = sm.shelf_id
WHERE sm.movie_id = $1 AND s.user_id = $2;