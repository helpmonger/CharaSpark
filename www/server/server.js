var express = require('express');
var app = express();

app.use('/', express.static('www'));

app.listen(8100, function() { console.log('listening')});



