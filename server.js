var express = require('express');
const osrs = require('osrs');
// var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

var router = express.Router();

app.use('/static', express.static(path.join(__dirname, 'public')));

// middleware to use for all requests
app.use(function(req, res, next) {
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

        osrs.hiscores.getPlayer(req.params.player).then(player => {
            console.log(player);
            res.status(200).send(player);
        }).catch((err) => {
            res.status(400).send({"Error": "There aren't any players with that name."});
        })

    } else {
        returnres.status(400).send({"Error": "It appears that you are missing a name."});
    }
})

app.get('/runescape/:version/hiscores/:player', function (req, res, next) {
    if (req.params.player) {
        const version = parseInt(req.params.version, 10);
        switch (req.params.version) {
            case rs:
                osrs.hiscores.getPlayer(req.params.player).then(player => {
                    console.log(player);
                    return res.status(200).send(player);
                })
                break;

            case osrs:
                osrs.hiscores.getPlayer(req.params.player).then(player => {
                    console.log(player);
                    return res.status(200).send(player);
                })
                break;
        
            default:
                break;
        }

    } else {
        returnres.status(400).send({"Error": "It appears that you are missing a name."});
    }
})

// For API requests without any wrapper -- must enable request at top.
//    request.get({
//        url: "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=" + req.params.player
//     }, function(error, response, player) {
//         if (!error && response.statusCode == 200) {
//             res.send(player);
//             console.log(req.params.player + ' is a valid account name');
//         }
//     });
    
app.listen(port);
console.log('Webserver listening on port:', port);