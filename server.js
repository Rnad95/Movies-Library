'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


//axios is async operation (Promise)
const axios = require('axios');
const data = require('./Movie Data/data.json');
const res = require('express/lib/response');
const pg = require('pg');

const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL)
const server = express();
server.use(cors());
server.use(express.json());

server.get('/', handleData);
server.get('/favorite', handleGet);
server.get('/serverError', handleServerError)
server.get('/trending', trendHandle);
server.get('/search', searchHandler);

server.get('/primaryInformation', primaryInfoHandler)
server.get('/translation', translateHandler)

server.post('/addMovie', addMovieHandler);
server.get('/getMovies', favMoviesHandler);

server.use('*', handleNotFound);



function addMovieHandler(req, res) {
    console.log(req.body)
    const movie = req.body;
    let sql = `INSERT INTO favMovies(media_type,adult, backdrop_path,genre_ids, original_language, original_title,overview,poster_path) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    let val = [movie.media_type, movie.adult, movie.backdrop_path, movie.genre_ids, movie.original_language, movie.original_title, movie.overview, movie.poster_path];
    client.query(sql, val).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        handleServerError(error, req, res)
    });

}

function favMoviesHandler(req, res) {
    let sql = `SELECT * FROM favMovies;`;
    client.query(sql).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        handleServerError(error, req, res)
    });


}


//adding a key in env + fixed number
let numberOfMovies = 2;

let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`;
// console.log(url)



function handleData(req, res) {
    let movs = [];

    for (let key in data) {
        let obj = new Moviee(data.title, data.poster_path, data.overview);
        movs.push(obj)

    }
    return res.status(200).json(movs);
}



function trendHandle(req, res) {

    axios.get(url)
        .then((trending) => {

            // console.log(trending.data.results)
            // console.log(result.data.recipes);
            let movs = trending.data.results.map(val => {
                return new Moviee(val.id, val.title, val.release_date, val.poster_path, val.overview);
            });
            res.status(200).json(movs);
        }).catch((err) => {
            handleServerError(error, req, res)

        });

}



function Moviee(adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count) {
    this.adult = adult
    this.backdrop_path = backdrop_path;
    this.genre_ids = genre_ids;
    this.id = id;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.title = title;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;

}

function primaryInfoHandler(req, res) {
    let movieId = 3
    let url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.APIKEY}&language=en-US`;

    axios.get(url)
        .then((priInfo) => {

            let movInfo = new Moviee(priInfo.data.page, priInfo.data.results)

            console.log(movInfo)
            res.status(200).json(movInfo);
        }).catch((err) => {
            handleServerError(err, req, res)
        })

}

function translateHandler(req, res) {
    let movieId = 3
    let url = `https://api.themoviedb.org/3/movie/${movieId}/translations?api_key=${process.env.APIKEY}&language=en-US`;

    axios.get(url)
        .then((priInfo) => {

            let movInfo = new Moviee(priInfo.data.if, priInfo.data.translations)

            console.log(movInfo)
            res.status(200).json(movInfo);
        }).catch((err) => {
            handleServerError(err, req, res)
        })

}



function searchHandler(req, res) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&sort_by=created_at.asc&query=Jack+Reacher`;

    axios.get(url)
        .then((search) => {

            let movs = search.data.results.map(val => {
                return new Moviee(val.adult, val.backdrop_path, val.genre_ids,
                    val.id, val.original_language, val.original_title,
                    val.overview, val.popularity, val.poster_path, val.release_date,
                    val.title, val.video, val.vote_average, val.vote_count

                );
            });

            let movSearch = new Moviee(search.data.page, movs, search.data.total_pages, search.data.total_results)

            // console.log(movSearch)
            res.status(200).json(movSearch);
        }).catch((err) => {
            handleServerError(err, req, res)
        })
}

server.use(handleServerError)


function handleServerError(error, req, res) {

    const err = {
        status: 500,
        messgae: error
    }
    res.status(500).send(err);
}



function handleNotFound(req, res) {

    res.status(404).send('page not found error');
}

function handleGet(req, res) {
    return res.status(200).send("Welcome to Favorite Page")
}




// remember put this at the end
client.connect().then(() => {
    server.listen(PORT, () => {

        console.log(`The server listening to port ${PORT}`);
    })

})