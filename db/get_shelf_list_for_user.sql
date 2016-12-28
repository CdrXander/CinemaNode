SELECT s.shelf_id, s.name FROM shelf s
WHERE s.user_id = $1;