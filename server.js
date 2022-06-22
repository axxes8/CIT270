const express = require("express"); //import library
const https = require("https");
const bodyParser = require('body-parser'); //This is middleware
const port = 443;
const app = express(); //using library
const md5 = require('md5');
const {createClient} = require('redis');
const fs = require("fs")

const redisClient = createClient(
    {
        socket:{
            port: 6379,
            host: '127.0.0.1'
        },
        url: 'redis://default:P@ssword@10.128.0.2:6379',
    }
);

app.use(bodyParser.json()); //use the middleware, (call it before anything else happens on each request)

// app.listen(port, ()=>{console.log("listening on port: " + port)}); //non https server start

https.createServer({ // https server start
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd',
},
    app).listen(port, async () =>{
        await redisClient.connect();
        console.log( "listening on port: " + port)})
    

app.get('/',(request,response)=>{//Everytime something call the API this is a request
    response.send("Hello") //a response is when the API gives the info requested.
});

// Validate the password
const validatePassword = async(request, response)=>{
    const requestHashedPassword = md5(request.body.password)
    const redisHashedPassword = await redisClient.hGet("passwords", request.body.userName);
    const loginRequest = request.body;
    console.log("Request body", JSON.stringify(request.body));
    
    //search database for username and retrieve current passwword
//const password = await redisClient.hmGet(request.body.userName)

    //compare hashed version of password that was sent with the hashed verson from the database
    if (loginRequest.userName=="bob@bob.com" && requestHashedPassword == redisHashedPassword){
        response.status(200); //200 means OK
        response.send("Welcome")
    } else {
        response.status(401); //401 means unauthorized
        response.send("Unauthorized")
    }
};

const savePassword = async (request, response)=>{
    const requestUserName = (request.body.userName)
    const requestPassword = md5(request.body.password)
    await redisClient.hSet("passwords", requestUserName, requestPassword)
    response.status(200);
    response.send({result:"Saved"});
};

app.post('/login', validatePassword)
app.post('/signup', savePassword)