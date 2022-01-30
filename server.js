'use strict';

const express = require('express');
const cors = require('cors');
const data = require('./Movie Data/data.json');
const { response } = require('express');



const server = express();
server.use(cors());


server.get('/', handleData);
server.get('/favorite', handleGet);
server.get('/serverError', handleServerError)
server.get('*', handleNotFound);

function handleServerError(req, res) {

    return res.status(500).send(`{
        "status": 500,
        "responseText": "Sorry, something went wrong"
        }`)
}

function handleNotFound(req, res) {

    res.status(404).send('page not found error');
}

function handleGet(req, res) {
    return res.status(200).send("Welcome to Favorite Page")
}

function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

}

function handleData(req, res) {
    let movs = [];

    for (let key in data) {
        let obj = new Movie(data.title, data.poster_path, data.overview);
        movs.push(obj)

    }



    return res.status(200).json(movs);
}


// remember put this at the end
server.listen(3000, () => {

    console.log("The server listening to port 3000");
})