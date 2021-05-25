const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config(); // to access dot env

const mongoConnect = require('./library/mongoDB');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors({credentials : true, origin : true}));

app.use('/', require('./routes/crud'));

const port = process.env.PORT || 4000;

// I want to first check if mongodb connection established and then connect to server.

mongoConnect.then(response => {
    app.listen(port, () => {
        
        console.log(`MongoDb connected successfully`)
        console.log(`App is listening on port ${port}`);
    })
})
.catch(err => {
    console.log(`Error connecting to db`, err);
})


// Three ways of writing function in Nodejs
// async await
// Promises => we will write where we need to create certain libraries or middle ware
// Again callback but promises using .then and .catch