var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ent = require('ent');



app
    .get('/chat', (req, res) => {
        res.render('chat.html.twig');
    })
;

io.on('connection', (socket) => {
    //Ajout des nouveaux pseudo sur tous les chats
    socket.on('new_pseudo', pseudo => {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('new_pseudo', pseudo);
    })

    //Quand un nouveau message arrive
    socket.on('new_message', message => {
        message = ent.encode(message);
        socket.broadcast.emit('new_message', {message: message, pseudo: socket.pseudo});
        socket.emit('new_message', {message: message, pseudo: socket.pseudo});
    });
});

http.listen(8080);