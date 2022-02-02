DROP TABLE IF EXISTS favMovies;

CREATE TABLE IF NOT EXISTS favMovies (

    media_type VARCHAR (30),
    adult BOOLEAN,
    backdrop_path VARCHAR(255),
    genre_ids VARCHAR(255),
    id SERIAL PRIMARY KEY,
    original_language VARCHAR(10),
    original_title VARCHAR(255),
    overview VARCHAR(10000),
    popularity INTEGER,
    poster_path VARCHAR(255),
    release_date VARCHAR(30),
    title VARCHAR(255),
    video BOOLEAN,
    vote_average INTEGER,
    vote_count INTEGER,
);