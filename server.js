const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const game_server = require('./game.server');
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client){

    client.userid = UUID();
    client.emit('onconnected', {id: client.userid});

    game_server.findGame(client);

    console.log('\t socket.io:: player ' + client.userid + ' connected');

    client.on('message', function(m) {

        game_server.onMessage(client, m);

    }); //client.on message

    client.on('disconnect', function () {

        //Useful to know when someone disconnects
        console.log('\t socket.io:: client disconnected ' + client.userid + ' ' + client.game_id);

        //If the client was in a game, set by game_server.findGame,
        //we can tell the game server to update that game state.
        if(client.game && client.game.id) {

            //player leaving a game should destroy that game
            game_server.endGame(client.game.id, client.userid);

        } //client.game_id

    }); //client.on disconnect
}); //sio.sockets.on connection

http.listen(port, function(){
    console.log('listening on *:' + port);
});

// const app = require('express')();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const UUID = require('uuid');
// const port = 5000;
//
// const verbose = false;
//
//
// //
// // sio.configure(function () {
// //     sio.set('log level', 0);
// //
// //     sio.set('authorization', function (handshakeData, cb) {
// //         cb(null, true); // error first cb style
// //     })
// // });
//
// io.on('connection', function (socket) {
//    socket.on('chat message', function (msg) {
//        io.emit('chat message', msg);
//    })
// });
//
// // io.on('connection', function (client) {
// //     // generate a uuid , and store this on their socket/connection
// //     client.userid = UUID();
// //
// //     client.on('chat message', function(msg){
// //         io.emit('chat message', msg);
// //     });
// //
// //
// //
// //     //tell the player they connected, giving them their id
// //     client.emit('onconnected', { id: client.userid } );
// //
// //     console.log('\t socket.io:: player ' + client.userid + ' connected');
// //
// //     client.on('disconnect', function () {
// //         console.log('\t socket.io:: client disconnected ' + client.userid );
// //     }) // on disconnection
// //
// // }); // on connection
//
// app.get('/', (req, res) => res.sendFile(__dirname, '/index.html'));
// // app.get('/', (r  eq, res) => res.send('/index.html'));
//
// app.get( '/*' , function( req, res, next ) {
//
//     //This is the current file they have requested
//     const  file = req.params[0];
//
//     //For debugging, we can track what files are requested.
//     if(verbose) console.log('\t :: Express :: file requested : ' + file);
//     //Send the requesting client the file.
//     res.sendFile( __dirname + '/' + file );
//
// });
//
//
// http.listen(port, () => console.log(`Example app listening on port ${port}!`));
