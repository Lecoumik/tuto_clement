const express = require('express')
const app = express()
const test = require('./test.json')
const cors = require('cors');

app.use(cors({}));

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:beluga@localhost:5432/chat");


function bonjour(name) {
    return "bonjour" + name;
}

app.listen(8080, () => {
    console.log('bienvenue les minous');
    console.log('serveur en écoute sur http://localhost:8080/');
    
})


app.get('/', (req,res) => {
    res.send("bienvenue dans l'api des minous")
})

app.get('/sendMessage/:name/:message', (req,res) => {
    var name = req.params.name;
    var message = req.params.message;
    db.task('post-message-events', async t => {
        return t.any("INSERT INTO chat (nom, message) VALUES ('"+name+"', '"+message+"')");
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(400).json(result);
    });
    res.send(name+" : "+message);
})



app.get('/historique', (req,res) => {
    var result = {};
    // se connecter a la base de donnée
    db.task('get-historique-events', async t => {
        return t.any('select * from chat');
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(400).json(result);
    });
})