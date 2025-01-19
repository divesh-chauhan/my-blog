require('dotenv').config();

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const connect_DB = require('./config/connect_DB');
const route = require('./routes/blogRoute');

const app = express();
connect_DB();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(morgan('dev'));


app.use('/api', route);

module.exports = app;