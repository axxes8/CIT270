const express = require("express"); //import library
const port = 3000;
const app = express(); //using library

app.listen(port, ()=>{console.log("listening on port: " + port)});

app.get('/',(request,response)=>{response.send("Hello")});