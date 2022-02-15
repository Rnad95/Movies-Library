'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

//axios is async operation (Promise)
const axios = require('axios');
const data = require('./Movie Data/data.json');
const res = require('express/lib/response');
const PORT = process.env.PORT;
// const { response } = require('express');

const server = express();
server.use(cors());


server.get('/', handleData);
server.get('/favorite', handleGet);
server.get('/serverError', handleServerError)
server.get('/trending', trendHandle);
server.get('/search', searchHandler);
server.get('/primaryInformation', primaryInfoHandler)
server.get('/translation', translateHandler)

server.use('*', handleNotFound);



//adding a key in env + fixed number
let numberOfMovies = 2;
let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`;
// console.log(url)


function Moviee(id, vote_count, original_language, title, image, release_date, overview) {

    this.id = id;
    this.vote_count = vote_count
    this.original_language = original_language;
    this.title = title;
    this.image = image;
    this.release_date = release_date;
    this.overview = overview;



}

function handleData(req, res) {
    let movs = [];

    for (let key in data) {
        let obj = new Moviee(val.id, val.title, val.release_date, val.poster_path, val.overview);
        movs.push(obj)

    }
    return res.status(200).json(movs);
}



function trendHandle(req, res) {

    axios.get(url)
        .then((trending) => {
            // id, vote_count, original_language, title, image, release_date, overview

            let movs = trending.data.results.map(val => {
                return new Moviee(val.id, val.vote_count, val.original_language, val.title, val.image, val.release_date, val.overview);
            });
            res.status(200).json(movs);
        }).catch((err) => {
            handleServerError(error, req, res)
        })
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
                return new Moviee(val.id, val.vote_count, val.original_language, val.title, val.image, val.release_date, val.overview

                );
            });

            let movSearch = new Moviee(search.data.page, movs, search.data.total_pages, search.data.total_results)

            console.log(movSearch)
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
server.listen(PORT, () => {

    console.log(`The server listening to port ${PORT}`);
})