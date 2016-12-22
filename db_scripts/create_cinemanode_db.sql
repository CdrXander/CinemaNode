-- CREATE the USERS table
CREATE TABLE public.users
(
    user_id serial NOT NULL,
    fb_user_id text ,
    first_name text ,
    last_name text,
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
    shelf_id serial NOT NULL,
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
    "imdbID" integer,
    title text,
    poster_url text,
    year integer,
    rating text,
    PRIMARY KEY ("imdbID")
);
ALTER TABLE public.movie
    OWNER to postgres;



-- CREATE the SHELF_MOVIE relational table
CREATE TABLE public.shelf_movie
(
    shelf_id integer,
    movie_id integer,
    create_date timestamp,
    PRIMARY KEY (shelf_id, movie_id),
    FOREIGN KEY (shelf_id)
        REFERENCES public.shelf (shelf_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY (movie_id)
        REFERENCES public.movie ("imdbID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE public.shelf_movie
    OWNER to postgres;



