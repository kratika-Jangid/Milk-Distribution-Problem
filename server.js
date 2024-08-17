const express = require('express');
const app = express();
const session = require('express-session')
const { db, users } = require('./db/loginTable');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'skadh32iehb37iudhebiwqnhk92ueniedn'
}))

const route1 = require('./routes/login').route;
const route2 = require('./routes/signup').route;
const route3 = require('./routes/profile').route;
const route4 = require('./routes/addGraph').route;
const route5 = require('./routes/openGraph').route;
const route6 = require('./routes/dataStruct').route;
app.use('/login', route1);
app.use('/signup', route2);
app.use('/profile', route3);
app.use('/add', route4);
app.use('/open', route5);
app.use('/dss', route6);
app.use('/', express.static(__dirname + '/public'));

let port = process.env.PORT || 4544;


db.sync()
    .then(() => {
        app.listen(port, () => {
            console.log('server started at http://localhost:4544');
        })
    }).catch((err) => {
        console.error("Error while db.sync" + err);
    })