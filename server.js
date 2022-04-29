const express = require("express"); //import library

const app = express(); //using library

app.listen(3000, ()=>{console.log("listening...")});

app.get('/',(request,response)=>{response.send("Hello")});