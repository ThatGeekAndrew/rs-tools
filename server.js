var express = require('express');
// var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

const osrs = require("osrs-wrapper");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

app.use('/static', express.static(path.join(__dirname, 'public')));

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// respond with an angular app when a GET request is made
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('Homepage visited');
})

app.get('/api/hiscores/:player', function (req, res, next) {
    if (req.params.player) {

        console.log('Hiscores API request for ' + req.params.player);

        try {
            console.log('trying...');
            
            osrs.hiscores.getPlayer(req.params.player)
                .then(player => {
                    console.log(player);
                    res.send(player);
                    // console.log(JSON.stringify(player, null, 2));
                });
        } catch (error) {
            console.log(error)
        }

    } else {
        res.status(500);
        res.send({"Error": "It appears that you are missing a name."});
        console.log("Looks like you are not sending the product id to get the product details.");
    }

    // For API requests without any wrapper -- must enable request at top.
//    request.get({
//        url: "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=" + req.params.player
//     }, function(error, response, player) {
//         if (!error && response.statusCode == 200) {
//             res.send(player);
//             console.log(req.params.player + ' is a valid account name');
//         }
//     });
})
    
app.listen(port);
console.log('Webserver listening on port:', port);