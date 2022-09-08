const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const hbs = require('express-handlebars');
const logger = require('morgan');

const routes = require('./routes/user.js');
const db = require('./config/db/index.js');
const SortMiddleware = require('./app/middlewares/SortMiddleware.js');

dotenv.config();
db.connect();

let app = express();
app.use(logger('dev'));
// fix CORS error_Method_2
// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_FE);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_FED);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
    }),
);
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.json());

app.use(SortMiddleware);
routes(app);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is ready at http://localhost:${process.env.PORT || 5000}/api`);
});
