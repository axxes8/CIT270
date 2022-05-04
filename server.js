const express = require("express"); //import library
const bodyParser = require('body-parser'); //This is middleware
const res = require("express/lib/response");
const port = 3000;
const app = express(); //using library

app.use(bodyParser.json()); //use the middleware, (call it before anything eles happens on each request)

app.listen(port, ()=>{console.log("listening on port: " + port)});

app.get('/',(request,response)=>{//Everytime something call the API this is a request
    response.send("Hello") //a response is when the API gives the info requested.
});

app.post('/login', (request, response)=>{ //A post is when a client sends new info to an API
    const loginRequest = request.body;
    if (loginRequest.userName=="bob@bob.com" && loginRequest.password=="B0bwashere!"){
        response.status(200); //200 means OK
        response.send("Welcome")
    } else {
        response.status(401); //401 means unauthorized
        response.send("Unauthorized")
    }
});