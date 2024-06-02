const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()


// EXPRESS SERVER
const app = express()
const PORT = process.env.PORT || 3333;


const db = require('./config/client')

// const session = require('express-session')

const MongoStore = require('connect-mongo');

const view_routes = require('./routes/view_routes')
const user_routes = require('./routes/user_routes')
const thought_routes = require('./routes/thought_routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


// app.use(session({
//     secret: process.env.SECRET_SESSION,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({client: db.client})
//     // cookie: { secure: true }
//   }))


// app.use('/', view_routes)
app.use('/api', user_routes)
app.use('/api', thought_routes)


db.connection.once('open', () => {
console.log('Connected to DB')

app.listen(PORT, () => {
    console.log('Connected on port', PORT)
})
})