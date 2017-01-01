INSERT INTO shelf_movie (shelf_id, movie_id,create_date)
SELECT $1, $2, $3
WHERE NOT EXISTS (SELECT * FROM shelf_movie WHERE shelf_id=$1 AND movie_id=$2);
