const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const app = express();

// initialize database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'admin',
      password : '159357',
      database : 'face-recognition-db'
    }
});

app.use(express.json());
app.use(cors());

// root endpoint
app.get('/', (req, res) => res.json(database.users));

// signin endpoint
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

// register endpoint
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

// profile endpoint
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries))
        .catch(err => res.status(400).json('Unable to get user entires.'));
});

app.listen(3030, () => console.log('app is running on port 3030'));