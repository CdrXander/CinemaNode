SELECT * FROM movie
JOIN shelf_movie sm ON sm.movie_id=movie.movie_id
WHERE sm.shelf_id = $1;