
-- Create a Single Test User
INSERT INTO public.users(
	user_id, 
	fb_user_id, 
	first_name, 
	last_name, 
	own_shelf_id, 
	seen_shelf_id, 
	watch_shelf_id
	)
	VALUES (1, 1, 'Tom', 'Stranger', 1, 2, 3);


-- Now give him a few shelves
INSERT INTO public.shelf(
	shelf_id, user_id, name, summary)
	VALUES (1, 1, 'My Movies', 'Movies I own');

INSERT INTO public.shelf(
	shelf_id, user_id, name, summary)
	VALUES (2, 1, 'To Watch', 'Movies I want to watch');

INSERT INTO public.shelf(
	shelf_id, user_id, name, summary)
	VALUES (3, 1, 'Seen', 'Movies I have seen');

-- And Add movies
INSERT INTO public.movie
	VALUES (
				'tt0372784',
				'Batman Begins' , 
				'https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg',
				2005, 
				'PG-13'
			);

INSERT INTO public.movie
	VALUES (
				'tt0468569', 
				'The Dark Knight',
				'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', 
				2008, 
				'PG-13'
			);

INSERT INTO public.movie
	VALUES (
				'tt1345836', 
				'The Dark Knight Rises',
				'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg', 
				2012, 
				'PG-13'
			);

INSERT INTO public.movie
	VALUES (
				'tt2313197', 
				'Batman: The Dark Knight Returns, Part 1',
				'https://images-na.ssl-images-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg', 
				2012, 
				'PG-13'
			);

-- INSERT INTO public.movie
-- 	VALUES (
-- 				'', 
-- 				'',
-- 				'', 
-- 				, 
-- 				''
-- 			);


-- Then add those movies to shelves
