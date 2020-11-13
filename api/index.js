const express = require('express')
const app = express()
const test = require('./test.json')


app.listen(8080, () => {
    console.log('bienvenue les minous');
})

app.get('/', (req,res) => {
    res.send("bienvenue dans l'api des minous")
})

app.get('/sendMessage/:name/:message', (req,res) => {
    var name = req.params.name;
    var message = req.params.message;
    res.send(name+" : "+message);
})


app.get('/historique/:name', (req,res) => {
    var name = req.params.name;
    res.send(name+" bientot tous les message ");
})




app.get('/historique', (req,res) => {
    res.status(200).json(test);
})