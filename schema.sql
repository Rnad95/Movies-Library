DROP TABLE IF EXISTS favMovies;

CREATE TABLE IF NOT EXISTS favMovies (

    adult BOOLEAN,
    backdrop_path VARCHAR(255),
    genre_ids integer[],
    id SERIAL PRIMARY KEY,
    original_language VARCHAR(30),
    original_title VARCHAR(30),
    overview VARCHAR(10000),
    popularity INTEGER,
    poster_path VARCHAR(255),
    release_date VARCHAR(30),
    title VARCHAR(255),
    video BOOLEAN,
    vote_average INTEGER,
    vote_count INTEGER,
    comment VARCHAR(255)
    
);