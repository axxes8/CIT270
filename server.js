const express = require("express"); //import library
const bodyParser = require('body-parser'); //This is middleware
const port = 3000;
const app = express(); //using library
const md5 = require('md5');
const redis = require('redis');

const redisClient = redis.createClient();

app.use(bodyParser.json()); //use the middleware, (call it before anything eles happens on each request)

app.listen(port, ()=>{console.log("listening on port: " + port)});

app.get('/',(request,response)=>{//Everytime something call the API this is a request
    response.send("Hello") //a response is when the API gives the info requested.
});

app.post('/login', async(request, response)=>{ //A post is when a client sends new info to an API
    const requestHashedPassword = md5(request.body.password)
    const redisHashedPassword = await redisClient.hGet("passwords", request.body.userName);
    
    const loginRequest = request.body;
    console.log("Request body", JSON.stringify(request.body));
    //search database for username and retrieve current passwword

    //comopare hashed version of password that was ent wit the hashed verson from the database
    if (loginRequest.userName=="bob@bob.com" && loginRequest.password=="ca9143bd31cbec6854a3480d112d53b6"){
        response.status(200); //200 means OK
        response.send("Welcome")
    } else {
        response.status(401); //401 means unauthorized
        response.send("Unauthorized")
    }
});