const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
const game_server = require('./game.server');
const game_server = require('./game.server.js');
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client){

    client.userid = UUID();
    client.emit('onconnected', {id: client.userid});

    //now we can find them a game to play with someone.
    //if no game exists with someone waiting, they create one and wait.
    game_server.findGame(client);

    // good to know when someone connects
    console.log('\t socket.io:: player ' + client.userid + ' connected');

    //Now we want to handle some of the messages that clients will send.
    //They send messages here, and we send them to the game_server to handle.
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

