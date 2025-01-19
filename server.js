require('dotenv').config();
const PORT = process.env.PORT || 1000;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const route = require('./routes/blogRoute');
const connect_DB = require('./config/connect_DB');

const app = express();
connect_DB();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(morgan('dev'));

// Home Page
app.get('/', (req,res) => {
    res.render('index');
});

app.use('/api', route);

app.listen(PORT, () => console.log(`http://localhost:${PORT}.`));


