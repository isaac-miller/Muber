const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const driverRoutes = require('./routes/drivers');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber_test', {useMongoClient: true});    
}

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extender: true}));

app.use("/", driverRoutes);
routes(app);

// Error-handling middleware
app.use((err, req, res, next) => {
    //console.log(err);
    res.status(422).send({ error: err.message});
});



module.exports = app;