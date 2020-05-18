const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.route');
const itemRoutes = require('./routes/item.route');

const app = express();

//Mongo DB connection  with mongoose // Ux2BIPfh1QZFylc1
// If mongo DB fails to connect, then add the IP white to anywhere in the mongo db atlas
mongoose.connect('mongodb+srv://sumeet_sonawane:Ux2BIPfh1QZFylc1@freelancer-project-rlmk5.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
).then(() => {
    console.log('***********Connection to database established!***********')
}).catch(err => {
    console.log(err);
});

// Parse the Request URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting headers for all the paths
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*"); // Resolves CORS issues
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );// If Url has some extra headers, add this, otherwise it will fail
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );// The Verbs like GET POST allowed
    next();
});

app.use('/api/user', userRoutes);

app.use('/api/item', itemRoutes);

//Export the whole express app to the server connection
module.exports = app;