
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config({
    path: '../.env'
});
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

module.exports = prisma;

// const { Client } = require("pg");

const app = express();
// const connectDb = async () => {
//     try {

//         const client = new Client({
//             user: process.env.PG_USER,
//             host: process.env.PG_HOST,
//             database: process.env.PG_DATABASE,
//             password: process.env.PG_PASSWORD,
//             port: process.env.PG_PORT
//         })
//         console.log(client);
//         await client.connect()
//         const res = await client.query('SELECT * FROM food')
//         console.log(res.rows)
//         await client.end()
//     } catch (error) {
//         console.log(error)
//     }
// }

// connectDb();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: [`${process.env.LOCAL_CLIENT_URL}`],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(session({
    name: 'foodie_session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false
    }
}));

const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/food', foodRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
