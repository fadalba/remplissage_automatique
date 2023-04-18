const express = require('express');/* recupere la variable express dans la boite express */
const mongoose  = require('mongoose'); //gere link api base de donnees
const Model = require('./models/users');
const jwt = require("jsonwebtoken");
require('dotenv').config();/* pour recuperer le fichier env */
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors') //configuration des differentes requettes pour acceder aux ressources
// const Model = require('../back_end/models/userModel');
// const jwt = require("jsonwebtoken");
const routes = require('./routes/routes');

const databaseLink = process.env.DATABASE_URL /* permet de recuperer le lien de la base de donnée */

mongoose.connect(databaseLink); /* permet d'avoir access à la base mongodb */
const database = mongoose.connection

const app = express(); /* express sert a ecouté les ports et à envoyer des données */

app.use(cors({origin:'*'}));/*   */

app.use(express.json());/* affiche les fichiers au format json */

app.use('/api', routes);

database.on('error', (error)=> {

console.log(error)

})

//Creation server socket 
const http = require('http').Server(app);

const io = require('socket.io')(http);

database.once('connected', ()=> {
    
console.log('Database Connected')

})

// nouvelle methode insertion 
const compteurSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0
  }
});
const Compteur = mongoose.model('Compteur', compteurSchema);

var fs = require('fs');
/* var index = fs.readFileSync( '/'); */

const { SerialPort } = require('serialport');
var { ReadlineParser } = require("@serialport/parser-readline")
const router = require('./routes/routes');
 const { Socket } = require('socket.io');
/* const parser = SerialPort.parsers; */ 
var path = require('path'); 
const { log } = require('console');

 var port = new SerialPort({ path:'/dev/ttyACM0',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});  
 var parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' })); 

/* port.pipe(parser); */
var url = "mongodb+srv://fadalba:Thiaroye44@cluster0.9vbufn8.mongodb.net/test";


var temoin = '0'


io.on('connection', function(socket) {
    
     console.log('port utilisé'); 
   socket.on("active", (arg) => {
        // console.log(arg); // world
        temoin = arg;
      });
    
      socket.on('optionA', () =>{
      port.write("1")
      });
         
      socket.on('optionB', () =>{
        port.write("2")
        });
           
      socket.on('tapisOn', () =>{
        port.write('3')
      
        })
        socket.on('tapisOff', () =>{
          port.write("4")
        
          })
                   
      socket.on('remplissageon', () =>{
        port.write("5")
        })

        socket.on('remplissageoff', () =>{
          port.write("6")
          })

          socket.on('bouchonOn', () =>{
            port.write("7")
            })
            socket.on('bouchonOff', () =>{
              port.write("8")
              })
               
});

 parser.on('data', function(data) { 
  console.log(data)
    //console.log('les information sont: ' + data);
    temp = data.split('/'); 
    var temperature = data.slice(0, 1); //decoupe de la temperature
    var humidite_serre  = data.slice(2, 3); //decoupe de l'humidite
    var humidite_sol = data.slice(4, 6); //decoupe de l'humidite
    var luminosite = data.slice(8, 11); //decoupe de l'humidite
    var distance = data.slice(12);
    //console.log(data.split('/'));
    io.emit('donne', {"temperature": temperature, "humidite_serre": humidite_serre,"humidite_sol": humidite_sol,"luminosite": luminosite, "distance":distance});
    io.emit('temperature',temperature);
    io.emit('humidite_serre',humidite_serre);
    io.emit('humidite_sol', humidite_sol);
    io.emit('luminosite', luminosite);
    io.emit('distance', distance);
    var datHeure = new Date(); 
     var min = datHeure.getMinutes();
    var heur = datHeure.getHours(); //heure
    var sec = datHeure.getSeconds(); //secondes
    var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
    var numMois = datHeure.getMonth() + 1; //le mois en chiffre
    var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
    if (numMois < 10) { numMois = '0' + numMois; }
    if (mois < 10) { mois = '0' + mois; }
    if (sec < 10) { sec = '0' + sec; }
    if (min < 10) { min = '0' + min; }
    var heureInsertion = heur + ':' + min + ':' + sec;
    var heureEtDate = laDate  + '-' + mois + '-' +  numMois; 
   
    const fetchMovies = (socket) => {
        data.findAll()
            .then(data => io.emit('fetchMovies', data))
            .catch(logError)
    }
   
 
 // nouvelle methode insertion 
 let totalRempli = 0;

parser.on('data', (data) => {
  // Mettre à jour le compteur
  totalRempli++;

  // Afficher la nouvelle valeur du compteur
  console.log(`Compteur : ${totalRempli}`);
});

// À la fin du processus de remplissage, enregistrer le compteur final dans la base de données
const nouveauCompteur = new Compteur({ total: totalRempli });
nouveauCompteur.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Compteur final enregistré : ${totalRempli}`);
  }
});

 

 
parser.on('mute', function(mute){
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("soutenance");
    var col = dbo.collection('compteur');
    col.find().toArray(function(err, items) {
        console.log(items);
        io.emit('mute', items);     
//console.log(items);
        
})

})
})
 })
 http.listen(3001, ()=>{
  console.log('server started at ${3001}')/* apres avoir ecouter le port 3001 affiche les données */
})