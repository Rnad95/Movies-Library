# Project Name - Project Version

**Author Name**: Renad Khawatreh

## WRRC

This is a Web Request Response cycle  
---

![WRRC](https://i.ibb.co/Q6bN7gD/Screenshot-from-2022-02-01-02-24-35.png)  

---  
---

## * ***Update WRRC***

![WRRC Db Updated](https://i.ibb.co/LP9wfZ1/Screenshot-from-2022-02-01-21-39-39.png)

---  

# Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
You have to Do this:  
This project about movies browser through data from TMDB API which allows to find a list of movies depending on its categories

Installation
Node.js is required to clone this application on your machine.

Install and run the appilcation through the next steps:

Clone the repository

git clone [Movies-Library](https://github.com/Rnad95/Movies-Library)
Install the dependencies
npm install and run the application in development mode

>npm start  

 The application will be viewed in *localhost:${YOUR_PORT}*

## Make sure to create your .env file with api key anf port as shown below  

---

>API_KEY= Your_API_KEY  
>PORT=YOUR_PORT

## * **Update**  

---

- Create a movie database using RDBM (**Postgresql**) and make DATABASE URL like:

>*DATABASE_URL=postgres://username:yourpassword@localhost:5432/DatabaseName*

- Download Pg Library to connect your server with postgresql

- Using Postman to get and retreive the data

## Project Features
<!-- What are the features included in you app -->
---
The features will include:  

- show a list of movies using its categories
High rated movies, search box to find the cartian movie by title and show the details which includes a poster image, overview, adult, and vote average.  
- The application can check the latest movies based on categories. it has recommendations of the movies, show the most popular movie, and suggestions movie. you should be create your own account to login.  
