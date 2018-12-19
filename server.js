var express = require('express');
var rsapi = require('runescape-api');
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
    console.log('Something is happening...');
    next(); // make sure we go to the next routes and don't stop here
});

// respond with an angular app when a GET request is made
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('Homepage visited');
});

app.get('/api/osrs/hiscores/:player/', function (req, res, next) {
    if (req.params.player) {
        rsapi.osrs.hiscores.player(
            req.params.player
        ).then(player => {
            res.status(200).send(player);
        }).catch(error => {
            res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on this hiscores list."});
            console.error({"Error": "It appears that " + req.params.player + " isn't on the highscores list."});
        });
    } else {
        res.status(400).send({"Error": "It appears that you are missing a name."});
    }
});

app.get('/api/osrs/hiscores/:player/:type', function (req, res, next) {
    if (req.params.player) {

        switch (req.params.type) {
            case 'ironman':
                // console.log('osrs ironman hiscores hit');
                rsapi.osrs.hiscores.player(
                    req.params.player, req.params.type
                ).then(player => {
                    res.status(200).send(player);
                }).catch(error => {
                    res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                    console.error({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                });
                break;
            case 'ultimate':
                // console.log('osrs ultimate hiscores hit');
                rsapi.osrs.hiscores.player(
                    req.params.player, req.params.type
                ).then(player => {
                    res.status(200).send(player);
                }).catch(error => {
                    res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                    console.error({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                });
                break;
            case 'hardcore':
                // console.log('osrs hardcore hiscores hit');
                rsapi.osrs.hiscores.player(
                    req.params.player, req.params.type
                ).then(player => {
                    res.status(200).send(player);
                }).catch(error => {
                    res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                    console.error({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                });
                break;
    
            default:
                res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on this hiscores list."});
                break;
        }
    } else {
        res.status(400).send({"Error": "It appears that you are missing a name."});
    }
});

app.get('/api/rs/hiscores/:player/', function (req, res, next) {
    if (req.params.player) {
        rsapi.rs.hiscores.player(
            req.params.player
        ).then(player => {
            res.status(200).send(player);
        }).catch(error => {
            res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on this hiscores list."});
            console.error(error);
        });
    } else {
        res.status(400).send({"Error": "It appears that you are missing a name."});
    }
});

app.get('/api/rs/hiscores/:player/:type', function (req, res, next) {
    if (req.params.player) {
        switch (req.params.type) {
            case 'ironman':
                // console.log('osrs ironman hiscores hit');
                rsapi.rs.hiscores.player(
                    req.params.player, req.params.type
                ).then(player => {
                    res.status(200).send(player);
                }).catch(error => {
                    res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                    console.error({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                });
                break;
            case 'ultimate':
                // console.log('osrs ultimate hiscores hit');
                rsapi.rs.hiscores.player(
                    req.params.player, req.params.type
                ).then(player => {
                    res.status(200).send(player);
                }).catch(error => {
                    res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                    console.error({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                });
                break;
            case 'hardcore':
                // console.log('osrs hardcore hiscores hit');
                rsapi.rs.hiscores.player(
                    req.params.player, req.params.type
                ).then(player => {
                    res.status(200).send(player);
                }).catch(error => {
                    res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                    console.error({"Error": "It appears that " + req.params.player + " isn't on the " + req.params.type + " hiscores list."});
                });
                break;
    
            default:
                res.status(400).send({"Error": "It appears that " + req.params.player + " isn't on this hiscores list."});
                break;
        }
    } else {
        res.status(400).send({"Error": "It appears that you are missing a name."});
    }
});

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