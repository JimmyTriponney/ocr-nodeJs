var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon



var app = express();



app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.get("/", (req, res) => {
    res.setHeader("content-type", "text/plain");
    res.send("Vous êtes à l'accueil.");
})

.get("/user/:id", (req, res) => {
    if( !parseInt(req.params.id) ) res.status(404).send("Page introuvable !");

    res.render("user.html.twig", { id: req.params.id });
})

.get("/user/list/:show", (req, res) => {
    if( !parseInt(req.params.show) ) res.status(404).send("Page introuvable !");

    var users = ['Jean', 'Yves', 'Emma', 'Toto', 'Gaëlle'];

    res.render("users-list.ejs", { show: req.params.show, users: users});
})
;



//Gestion 404
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});



app.listen(8080);


