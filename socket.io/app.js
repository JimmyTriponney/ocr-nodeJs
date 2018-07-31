var http = require('http');
var fs = require('fs');



//Chargement de index.html
var server = http.createServer( (req, res) => {
    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, {"contetn-type": "text/html"});
        res.end( data );
    })
});



//Chargement de socket.io
var io = require('socket.io').listen(server);



//Quand le client se connecte, on le note dans la console
io.sockets.on('connection', (socket) => {
    
    //Enregistrement du pseudo saisie
    socket.on('nouveau_pseudo', (pseudo) => {
        socket.pseudo = pseudo;
    });

    socket.emit('message', "Vous êtes bien connecté !");

    socket.on('message', (data) => {
        console.log( socket.pseudo+' embête le server !');
        socket.broadcast.emit('message', socket.pseudo+' : '+data);
    })
});





server.listen(8080);
