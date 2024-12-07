const express = require('express');
const donations = require('./route/donations.route');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/donations', donations);

mongoose.connect(mongoURI, {useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB: '))

const path = require('path')

let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
