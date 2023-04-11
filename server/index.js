const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${config.database}`);
});
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(session({ secret: 'Elminster', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});