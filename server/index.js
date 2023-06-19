import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import users from './routes/users.js';
import characters from './routes/characters.js';

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${process.env.DATABASE}`);
});
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

const app = express();
const port = 3001;

app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy-Report-Only',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
    );
    next();
});

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(session({ secret: process.env.DATABASE_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

import pass from './config/passport.js';
pass(passport);

app.use('/api/users', users);
app.use('/api/characters', characters);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});