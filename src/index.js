const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const hbs = require('express-handlebars');

const routes = require('./routes/user.js');
const db = require('./config/db/index.js');
const SortMiddleware = require('./app/middlewares/SortMiddleware.js');

dotenv.config();
db.connect();

let app = express();
app.use(cors());

app.options('*', cors());

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
