var http = require('http');
var url = require('url');
var queryString = require('querystring');
var EventEmitter = require('events').EventEmitter;
var monmodule = require('./monModule');

//Test de mon module
monmodule.direBonjour();
monmodule.direByeBye();

//Le html de ma page
var html = '<!DOCTYPE html>'
            +'<html>'
                +'<head>'
                    +'<meta charset="UTF-8"/>'
                    +'<title>Ma page avec nodeJS</title>'
                +'</head>'
                +'<body>';



//Quelque controller pour gérer les différentes pages
var index = () => {
    html += '<p>Ma page d\'accueil.</p>';
};

var test = () => {
    html += '<p>Ceci est une page de test.</p>';
};

var notFound = () => {
    html += '<p>Cette page n\'existe pas.</p>';
};



//Creation du serveur
var server = http.createServer();

//Ecoute du port 8080
server.listen(8080);


//Emmetre des événements
var jeu = new EventEmitter();
/* Création d'un événement */
jeu.on('gameover', (message) => {
    if(message !== undefined){
        console.log(message);
    }
    else{
        console.log('GameOver');
    }
});
/* Appel d'un événement */
jeu.emit('gameover', 'Perdu !!!');



//Ecoute des événements
/* Requête au serveur */
server.on('request', (req, res) => {
    //Code de retour, initialement 200
    var codeRes = 200;


    //Récupération de l'url
    var path = url.parse( req.url ).pathname;
    //Récupération de la ligne de GET
    var get = url.parse( req.url ).query;//La ligne de get au complet
    var params = queryString.parse( get );//La ligne de get en tableau


    //Personnalisation du message de la page
    if( 'firstname' in params && 'name' in params ){
        html += '<p><u>Bonjour '+params.firstname+' '+params.name+' vous êtes sur la page :</u></p>';
    }

    //Création du retour en fonction de la page appelé
    if( '/' == path ){
        index();
    }
    else if( '/test' == path ){
        test();
    }
    else{//Pour les pages non-existantes
        codeRes = 404;
        notFound();
    }

    html += '</body></html>';

    //Création de l'en-tête http
    res.writeHead(
        codeRes,
        {"content-type": "text/html"}
    );

    res.write(html);

    //Envoi du retour
    res.end();
});

/* Arret du serveur */
server.on('close', () => {
    console.log('Arret du serveur !');
});



//Arret du serveur
//server.close();