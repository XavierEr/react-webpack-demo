var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 10000));

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});