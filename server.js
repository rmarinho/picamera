#!/usr/bin/env node
console.log("Intiliazing piCamera raspberry app");

var app = require('./app').init(3000);
var macAdd;

var locals = {_layoutFile: true };


require('getmac').getMac(function(err,macAddress){
    if (err)  throw err;
    console.log("MacAdress: " + macAddress);  
    macAdd = macAddress;  
});

app.get('/', function(req,res){

    locals.date = new Date().toLocaleDateString();
    locals.macAddress =macAdd;

    res.render('index.ejs', locals);
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
    res.render('404.ejs', locals);
});