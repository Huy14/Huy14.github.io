const express = require('express');
const bodyParser = require('body-parser');

const studentsRoute = require('./routes/studentsRoute');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/students', studentsRoute);

module.exports = app;
