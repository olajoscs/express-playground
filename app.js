const port = 8080;
const ip   = '192.168.100.103';

const express    = require('express');
const http       = require('http');
const url        = require('url');
const bodyParser = require('body-parser');

const responseSender = require('./modules/http/responsesender');

var app = express();

app.set('port', process.env.PORT || port);
app.set('ip', process.env.IP || ip);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/users', require('./controllers/usercontroller'));

app.listen(port);
