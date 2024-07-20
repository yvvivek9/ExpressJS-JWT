const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.resolve('client', 'artifacts', 'web')));
app.get("/", (req, res) => {
    res.sendFile(path.resolve('client', 'artifacts', 'web', 'index.html'));
});

module.exports = app;