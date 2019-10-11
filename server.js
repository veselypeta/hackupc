const express = require('express');
const app = express();
const port = 5000;
const io = require('socket.io');


app.get('/', (req, res) => res.send('Hello World!'));

app.get( '/*' , function( req, res, next ) {

    //This is the current file they have requested
    var file = req.params[0];

    //For debugging, we can track what files are requested.
    if(verbose) console.log('\t :: Express :: file requested : ' + file);

    //Send the requesting client the file.
    res.sendfile( __dirname + '/' + file );

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
