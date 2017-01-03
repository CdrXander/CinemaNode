-- DELETE DB
DROP TABLE IF EXISTS shelf_movie;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS shelf;
DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS shelf_pk;
DROP SEQUENCE IF EXISTS users_pk;

-- CREATE DB

-- CREATE SEQUENCEs for the users and shelf primary keys
CREATE SEQUENCE public.users_pk
    INCREMENT 1
    START 100
    MINVALUE 1
;

ALTER SEQUENCE public.users_pk
    OWNER TO postgres;


CREATE SEQUENCE public.shelf_pk
    INCREMENT 1
    START 100
    MINVALUE 1
;

ALTER SEQUENCE public.shelf_pk
    OWNER TO postgres;


-- CREATE the USERS table
CREATE TABLE public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_pk'::regclass),
    fb_user_id text ,
    first_name text ,
    last_name text,
    photo_url text,
    join_date date,
    own_shelf_id integer,
    seen_shelf_id integer,
    watch_shelf_id integer,
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
);
ALTER TABLE public.users
    OWNER to postgres;


-- CREATE the SHELF table
CREATE TABLE public.shelf
(
    shelf_id integer NOT NULL DEFAULT nextval('shelf_pk'::regclass),
    user_id integer,
    name text,
    summary text,
    create_date timestamp,
    PRIMARY KEY (shelf_id),
    FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
);
ALTER TABLE public.shelf
    OWNER to postgres;


-- CREATE the MOVIE table
CREATE TABLE public.movie
(
    movie_id text,
    title text,
    poster_url text,
    year integer,
    rating text,
    PRIMARY KEY (movie_id)
);
ALTER TABLE public.movie
    OWNER to postgres;



-- CREATE the SHELF_MOVIE relational table
CREATE TABLE public.shelf_movie
(
    shelf_id integer,
    movie_id text,
    create_date timestamp,
    PRIMARY KEY (shelf_id, movie_id),
    FOREIGN KEY (shelf_id)
        REFERENCES public.shelf (shelf_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY (movie_id)
        REFERENCES public.movie (movie_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE public.shelf_movie
    OWNER to postgres;

-- INSERT TEST DATA

-- Create Test Users 
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

INSERT INTO public.users
	(user_id, first_name,last_name)
	VALUES (99,'Testy', 'Testerson');
INSERT INTO public.shelf
	(shelf_id,user_id, name, summary)
	VALUES (99,99, 'My Movies', 'Movies I own');

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

-- Add movies and put them on shelves

-- INSERT INTO public.movie VALUES ('tt0372784','Batman Begins','https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg',2005,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0468569','The Dark Knight','https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',2008,'PG-13');
-- INSERT INTO public.movie VALUES ('tt1345836','The Dark Knight Rises','https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',2012,'PG-13');
-- INSERT INTO public.movie VALUES ('tt2313197','Batman: The Dark Knight Returns, Part 1','https://images-na.ssl-images-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg',2012,'PG-13');
-- INSERT INTO public.movie VALUES ('tt2166834','Batman: The Dark Knight Returns, Part 2','https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1Mjk1NTY2NV5BMl5BanBnXkFtZTgwMTA2MDEwNzE@._V1_SX300.jpg',2013,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0107290','Jurassic Park','https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg',1993,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0119567','The Lost World: Jurassic Park','https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg',1997,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0163025','Jurassic Park III','https://images-na.ssl-images-amazon.com/images/M/MV5BZTU1ZWU4ZjUtZDMwYS00MmU4LWI3Y2UtZWVjMWIzODMyOWQ4XkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_SX300.jpg',2001,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0369610','Jurassic World','https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5MTE0MTk3Nl5BMl5BanBnXkFtZTgwMjczMzk2NTE@._V1_SX300.jpg',2015,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0080684','Star Wars: Episode V - The Empire Strikes Back','https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',1980,'PG');
-- INSERT INTO public.movie VALUES ('tt0086190','Star Wars: Episode VI - Return of the Jedi','https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',1983,'PG');
-- INSERT INTO public.movie VALUES ('tt0076759','Star Wars: Episode IV - A New Hope','https://images-na.ssl-images-amazon.com/images/M/MV5BZGEzZTExMDEtNjg4OC00NjQxLTk5NTUtNjRkNjA3MmYwZjg1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',1977,'PG');
-- INSERT INTO public.movie VALUES ('tt2488496','Star Wars: The Force Awakens','https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',2015,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0120915','Star Wars: Episode I - The Phantom Menace','https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZGIwMzAtZTBkMS00M2JiLTk2MDctM2FlNTQ2OWYwZDZkXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',1999,'PG');
-- INSERT INTO public.movie VALUES ('tt0121766','Star Wars: Episode III - Revenge of the Sith','https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',2005,'PG-13');
-- INSERT INTO public.movie VALUES ('tt0121765','Star Wars: Episode II - Attack of the Clones','https://images-na.ssl-images-amazon.com/images/M/MV5BNDRkYzA4OGYtOTBjYy00YzFiLThhYmYtMWUzMDBmMmZkM2M3XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',2002,'PG');
-- INSERT INTO public.movie VALUES ('tt3748528','Rogue One: A Star Wars Story','https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',2016, 'PG-13');

INSERT INTO public.movie VALUES ('tt0372784','Batman Begins','https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg',2005,'PG-13');
INSERT INTO public.shelf_movie VALUES (1, 'tt0372784');
INSERT INTO public.shelf_movie VALUES (3, 'tt0372784');

INSERT INTO public.movie VALUES ('tt0468569','The Dark Knight','https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',2008,'PG-13');
INSERT INTO public.shelf_movie VALUES (1, 'tt0468569');
INSERT INTO public.shelf_movie VALUES (3, 'tt0468569');

INSERT INTO public.movie VALUES ('tt1345836','The Dark Knight Rises','https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',2012,'PG-13');
INSERT INTO public.shelf_movie VALUES (1, 'tt1345836');
INSERT INTO public.shelf_movie VALUES (3, 'tt1345836');

INSERT INTO public.movie VALUES ('tt2313197','Batman: The Dark Knight Returns, Part 1','https://images-na.ssl-images-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg',2012,'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt2313197');
INSERT INTO public.shelf_movie VALUES (3, 'tt2313197');

INSERT INTO public.movie VALUES ('tt2166834','Batman: The Dark Knight Returns, Part 2','https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1Mjk1NTY2NV5BMl5BanBnXkFtZTgwMTA2MDEwNzE@._V1_SX300.jpg',2013,'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt2166834');
INSERT INTO public.shelf_movie VALUES (3, 'tt2166834');

INSERT INTO public.movie VALUES ('tt0107290','Jurassic Park','https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg',1993,'PG-13');
INSERT INTO public.shelf_movie VALUES (1, 'tt0107290');
INSERT INTO public.shelf_movie VALUES (3, 'tt0107290');

INSERT INTO public.movie VALUES ('tt0119567','The Lost World: Jurassic Park','https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg',1997,'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt0119567');
INSERT INTO public.shelf_movie VALUES (3, 'tt0119567');

INSERT INTO public.movie VALUES ('tt0163025','Jurassic Park III','https://images-na.ssl-images-amazon.com/images/M/MV5BZTU1ZWU4ZjUtZDMwYS00MmU4LWI3Y2UtZWVjMWIzODMyOWQ4XkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_SX300.jpg',2001,'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt0163025');
INSERT INTO public.shelf_movie VALUES (3, 'tt0163025');

INSERT INTO public.movie VALUES ('tt0369610','Jurassic World','https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5MTE0MTk3Nl5BMl5BanBnXkFtZTgwMjczMzk2NTE@._V1_SX300.jpg',2015,'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt0369610');
INSERT INTO public.shelf_movie VALUES (3, 'tt0369610');

INSERT INTO public.movie VALUES ('tt0080684','Star Wars: Episode V - The Empire Strikes Back','https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',1980,'PG');
INSERT INTO public.shelf_movie VALUES (1, 'tt0080684');
INSERT INTO public.shelf_movie VALUES (2, 'tt0080684');
INSERT INTO public.shelf_movie VALUES (3, 'tt0080684');

INSERT INTO public.movie VALUES ('tt0086190','Star Wars: Episode VI - Return of the Jedi','https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',1983,'PG');
INSERT INTO public.shelf_movie VALUES (1, 'tt0086190');
INSERT INTO public.shelf_movie VALUES (2, 'tt0086190');
INSERT INTO public.shelf_movie VALUES (3, 'tt0086190');

INSERT INTO public.movie VALUES ('tt0076759','Star Wars: Episode IV - A New Hope','https://images-na.ssl-images-amazon.com/images/M/MV5BZGEzZTExMDEtNjg4OC00NjQxLTk5NTUtNjRkNjA3MmYwZjg1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',1977,'PG');
INSERT INTO public.shelf_movie VALUES (1, 'tt0076759');
INSERT INTO public.shelf_movie VALUES (2, 'tt0076759');
INSERT INTO public.shelf_movie VALUES (3, 'tt0076759');

INSERT INTO public.movie VALUES ('tt2488496','Star Wars: The Force Awakens','https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',2015,'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt2488496');
INSERT INTO public.shelf_movie VALUES (3, 'tt2488496');

INSERT INTO public.movie VALUES ('tt0120915','Star Wars: Episode I - The Phantom Menace','https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZGIwMzAtZTBkMS00M2JiLTk2MDctM2FlNTQ2OWYwZDZkXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',1999,'PG');
INSERT INTO public.shelf_movie VALUES (1, 'tt0120915');
INSERT INTO public.shelf_movie VALUES (3, 'tt0120915');

INSERT INTO public.movie VALUES ('tt0121766','Star Wars: Episode III - Revenge of the Sith','https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',2005,'PG-13');
INSERT INTO public.shelf_movie VALUES (1, 'tt0121766');
INSERT INTO public.shelf_movie VALUES (3, 'tt0121766');
INSERT INTO public.shelf_movie VALUES (99, 'tt0121766');

INSERT INTO public.movie VALUES ('tt0121765','Star Wars: Episode II - Attack of the Clones','https://images-na.ssl-images-amazon.com/images/M/MV5BNDRkYzA4OGYtOTBjYy00YzFiLThhYmYtMWUzMDBmMmZkM2M3XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',2002,'PG');
INSERT INTO public.shelf_movie VALUES (1, 'tt0121765');
INSERT INTO public.shelf_movie VALUES (3, 'tt0121765');
INSERT INTO public.shelf_movie VALUES (99, 'tt0121765');

INSERT INTO public.movie VALUES ('tt3748528','Rogue One: A Star Wars Story','https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',2016, 'PG-13');
INSERT INTO public.shelf_movie VALUES (2, 'tt3748528');
INSERT INTO public.shelf_movie VALUES (3, 'tt3748528');
INSERT INTO public.shelf_movie VALUES (99,'tt3748528');
