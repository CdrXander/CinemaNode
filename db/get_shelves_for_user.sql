SELECT s.shelf_id, s.name, s.summary, m.movie_id, m.title, m.poster_url, m.year, m.rating
FROM shelf s
JOIN shelf_movie sm ON s.shelf_id = sm.shelf_id
JOIN movie m ON sm.movie_id = m.movie_id
WHERE s.user_id = $1
ORDER BY s.shelf_id;