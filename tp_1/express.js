var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var todo = [];

app
    .use( cookieSession({ secret: 'todotop secret'}) )
    .use( (req, res, next) => {
        if( req.session.todo === undefined ) req.session.todo = [];
        next();
    })    
    .get('/', (req, res) => {
        res.render('todo/todo.html.twig', {todo: req.session.todo});
    })
    .post('/add/', urlencodedParser, (req, res) => {
        if( req.body.add !== undefined ){
            req.session.todo.push( req.body.add );
        }
        res.redirect('/');
    })
    .get('/delete/:id', (req, res) => {
        if( req.params.id > -1 && req.params.id < req.session.todo.length ) req.session.todo.splice(req.params.id,1);
        res.redirect('/');
    })
    .use( (req, res) => {
        res.redirect('/');
    })
;

app.listen('8080');