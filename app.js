const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

const app = express();

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

const sessionSecret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}));

const mustache = require('mustache-express');
app.engine('mustache', mustache(path.join(__dirname, 'views/partials'), '.mustache'));
app.set('view engine', 'mustache');

const router = require('./routes/familyOrganiserRoutes');
app.use('/', router);

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})
