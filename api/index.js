const express = require('express')
const app = express()
const test = require('./test.json')
const cors = require('cors');


app.use(cors({}));

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:beluga@localhost:5432/chat");


var gpsList = ['tour de la fnac', 'tour du grand rond', 'bateau'];


var gpsExemple = [
        { id: 1, nom: 'tour de la fnac', message: '43.60583302304571, 1.448622119013915' },
        { id: 2, nom: 'tour de la fnac', message: '43.60934569289202, 1.4540093627100883' },
        { id: 3, nom: 'tour de la fnac', message: '43.605073385916135, 1.4567339582455232' },
        { id: 4, nom: 'tour de la fnac', message: '43.604433166987555, 1.4500036660619386' },
        { id: 5, nom: 'tour du grand rond', message: '43.59696402160219, 1.4521421074708862' },
        { id: 6, nom: 'tour du grand rond', message: '43.59620610843473, 1.4536577765180567' },
        { id: 7, nom: 'tour du grand rond', message: '43.59482093233236, 1.4526473305065801' },
        { id: 8, nom: 'tour du grand rond', message: '43.595369779507614, 1.4514203603497873' },
        { id: 9, nom: 'tour du grand rond', message: '43.59696402160219, 1.4521421074708862' },
        { id: 10, nom: 'bateau', message: '43.58613790320873, 1.4308780153430622' },
        { id: 11, nom: 'bateau', message: '43.594711038713235, 1.4385285351442416' },
        { id: 12, nom: 'bateau', message: '43.59978115996657, 1.4384563604291358' },
        { id: 13, nom: 'bateau', message: '43.60218539802999, 1.435064148819179' },
        { id: 14, nom: 'bateau', message: '43.60500764185966, 1.4188248379204493' }
    ];

var champs = {
    weight: 3,
    color: "#0000FF",
    coord: [
        { lat: 43.85965740391465,  lng: 1.8808027013562427},
        { lat: 43.85463525545531,  lng: 1.877212009357446},
        { lat: 43.85549240546536,  lng: 1.8753719874653094},
        { lat: 43.85821557411262,  lng: 1.8770456857812627},
        { lat: 43.860165038917046, lng: 1.878891045462955},
        { lat: 43.85965740391465,  lng: 1.8808027013562427},
        // { lat: , lng: },
     ]};

  var traces = {
    weight: 3,
    color: "#FF0000",
    coord: [
        { lat: 43.85965740391465,  lng: 1.8808027013562427},
        { lat: 43.85463525545531,  lng: 1.877212009357446},
        { lat: 43.85472754509507,  lng: 1.8770008169755021},
        { lat: 43.85967162465507,  lng: 1.880627596472961},
        { lat: 43.859801726476014, lng: 1.8803028102493082},
        { lat: 43.854805612694435, lng: 1.8768023365054924},
        { lat: 43.85981473664251,  lng: 1.8801404171374816},
        { lat: 43.85492271390185,  lng: 1.876495593960931},
        // { lat: , lng: },
    ]};

    var coord = {c1:champs,t1:traces};

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

app.get('/gps', (req,res) => {
    var html = '<a href="http://localhost:8080/gpsAll">/tout le json</a></br>';
    html += '<a href="http://localhost:8080/gpsVehicules">/liste des vehicules</a></br>';
    html += '<a href="http://localhost:8080/gpsMaquette">la maquette</a></br>';
    
    res.status(200).send(html);
})

app.get('/gpsAll', (req,res) => {
    res.status(200).json(gpsExemple);
})

app.get('/gpsMaquette', (req,res) => {
    res.status(200).sendFile("C:/Users/Parayre/Desktop/Minou/tuto_clement/documents/maquette paint.png");
})


app.get('/gpsVehicules', (req,res) => {
    res.status(200).json(gpsList);
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

  // calling functions for map
  app.get('/coord', (req,res) => {    
    res.status(200).json(coord);
})

