var express = require("express");
var router  = express.Router();
//var Driver = require("../models/driver");
var request = require('request');

router.get('/drivers', (req, res) => {
    console.log(req.query);
    const url = 'http://127.0.0.1:' + process.env.PORT + '/api/drivers?lng=' + req.query.lng + '&lat=' + req.query.lat;
    request({
        url: url, //on 3000 put your port no.
        method: 'GET'
    }, function (error, response, body) {
            res.render('drivers', {drivers: JSON.parse(body)});
        });
});

router.get('/drivers/create', (req, res) => {
    res.render('create');
});

router.post('/drivers', (req, res) => {
    const url = 'http://127.0.0.1:' + process.env.PORT + '/api/drivers';
    //console.log(req.body);
    //console.log(url);
    //console.log(req);
    console.log("++++++++++++++++++++++++END OF req++++++++++++++++++++++++");
    request({
        url: url,
        method: 'POST',
        form: {email: req.body.email}
    }, function (error, response, body) {
        if(error) {
            console.log(error);
            res.render('error');
        } else {
            //console.log(body);
            res.render('success', {driver: JSON.parse(body)});
        }
        
    });
});

module.exports = router;