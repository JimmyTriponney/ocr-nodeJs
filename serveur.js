var http = require('http');
var url = require('url');
var queryString = require('querystring');
var EventEmitter = require('events').EventEmitter;
var monmodule = require('./monModule');
var markdown = require('markdown').markdown;

//Test de mon module
monmodule.direBonjour();
monmodule.direByeBye();

//Test de markdown
console.log( markdown.toHTML('un paragraphe en **markdown** !') );

//Le html de ma page
var html = '<!DOCTYPE html>'
            +'<html>'
                +'<head>'
                    +'<meta charset="UTF-8"/>'
                    +'<title>Ma page avec nodeJS</title>'
                +'</head>'
                +'<body>';



//Déclaration de routes
var routes = {
    "/": { controller: "index", codeRes: 200, app: "text/html"},
    "/test": { controller: "test", codeRes: 200, app: "text/html"},
    "notFound": { controller: "notFound", codeRes: 404},
}



//Quelquse controllers pour gérer les différentes pages
var index = (get) => {
    console.log( get );
    return '<p>Ma page d\'accueil.</p>';
};

var test = () => {
    return '<p>Ceci est une page de test.</p>';
};

var notFound = () => {
    return '<p>Cette page n\'existe pas.</p>';
};



//Creation du serveur
var server = http.createServer((req, res) => {

    //Récupération de l'url
    var path = url.parse( req.url ).pathname;
    //Récupération de la ligne de GET
    var get = url.parse( req.url ).query;//La ligne de get au complet
    var params = queryString.parse( get );//La ligne de get en tableau


    //Tests des paramétres GET
    if( 'firstname' in params && 'name' in params ){
        console.log('<p><u>Bonjour '+params.firstname+' '+params.name+' vous êtes sur la page :</u></p>');
    }


    //Gestion des routes
    if( path in routes ){
        res.writeHead(
            parseInt(routes[path]['codeRes']),
            routes[path]['app']
        );
        res.write( eval(routes[path]['controller']+'('+get+')') );
    }
    else{
        res.writeHead(
            parseInt(routes['notFound']['codeRes']),
            routes['notFound']['app']
        );
        res.write( eval(routes['notFound']['controller']+'()') );        
    }


    //Envoi du retour
    res.end();
});


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
//server.on('request', () => {});

/* Arret du serveur */
server.on('close', () => {
    console.log('Arret du serveur !');
});



//Arret du serveur
//server.close();