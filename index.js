/**
 * Created by Trent on 4/15/2017.
 */

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'index.html'));
    // res.sendfile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Not sure what this listen block does.')
});