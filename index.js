require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const eventsRoutes = require('./src/routes/events');
const usersRoutes = require('./src/routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;
const connectionConfig = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(DB_CONNECTION, connectionConfig, () => console.log('Connected'));

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => res.send('We are on home'))
app.use('/events', eventsRoutes);
app.use('/auth', usersRoutes);
app.listen(5000);