const express = require('express');
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

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});