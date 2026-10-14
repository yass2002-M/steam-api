const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const gamesController = require('./src/controller/gamesController');
const connectDB = require('./config/mongoConfig')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/games', gamesController);

connectDB().then(()=>{app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})});