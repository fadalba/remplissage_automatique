const express = require('express');/* recupere la variable express dans la boite express */
const mongoose  = require('mongoose'); //gere link api base de donnees
const Model = require('./models/users');
const Compteur = require('./models/compteur');
const jwt = require("jsonwebtoken");
require('dotenv').config();/* pour recuperer le fichier env */
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors') //configuration des differentes requettes pour acceder aux ressources
const routes = require('./routes/routes');

const databaseLink = process.env.DATABASE_URL /* permet de recuperer le lien de la base de donnée */

mongoose.connect(databaseLink); /* permet d'avoir access à la base mongodb */
const database = mongoose.connection

const app = express(); /* express sert a ecouté les ports et à envoyer des données */

app.use(cors({origin:'*'}));/* Il s'agit d'un mécanisme permettant d'autoriser ou de restreindre les ressources demandées sur un serveur Web en fonction de l'endroit où la requête HTTP a été lancée.  */

app.use(express.json());/* affiche les fichiers au format json */

app.use('/api', routes);

database.on('error', (error)=> {

console.log(error)

})

//Creation server socket
const http = require('http').Server(app);

const io = require('socket.io')(http);

database.once('connected', ()=> {

console.log('base de données Connectée')

})


  var fs = require('fs');
  const { SerialPort } = require('serialport');
  var { ReadlineParser } = require("@serialport/parser-readline")
  const router = require('./routes/routes');
 const { Socket } = require('socket.io');

 var port = new SerialPort({ path:'/dev/ttyACM1',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});
 var parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

var url = "mongodb+srv://fadalba:Thiaroye44@cluster0.vk1j3ac.mongodb.net/soutenance";



io.on('connection', function(socket) {

     console.log('port utilisé');
   socket.on("active", (arg) => {
        // console.log(arg); // world
        temoin = arg;
      });

      socket.on('Init', () =>{
        port.write("1")
        });

      socket.on('remiseazero', () =>{
      port.write("2")
      });

      socket.on('option1', () =>{
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

// nouvelle methode insertion
let totalRempli = 0;

 parser.on('data', function(data) {
  console.log(data)
    //console.log('les information sont: ' + data);
    remplit = data.split('/');
    var nbr_rempli = data.slice(0, 1); //decoupe 
    var compteurEnCours = data.slice(4);
    console.log(compteurEnCours);
    io.emit('data', {"compteurEnCours": compteurEnCours});
    io.emit('compteurEnCours',compteurEnCours);

    //console.log(data.split('/'));
    /* io.emit('donne', {"quantité": nbr_rempli});
    io.emit('quantité',nbr_rempli); */

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
    var heureEtDate = laDate  + '-' + numMois + '-' +  mois;

 

  parser.on('data', async (data) => {
  // Mettre à jour le compteur
  totalRempli++;
// findOne() est une méthode Mongoose qui permet de récupérer un document unique dans la collection, en fonction d'un critère de recherche.
 //Dans ce cas, le critère de recherche est un objet qui contient une propriété Date égale à la valeur de la variable heureEtDate
 // exec() est une méthode Mongoose qui permet d'exécuter la requête.
 // Dans ce cas, l'utilisation de exec() n'est pas strictement nécessaire, car findOne() renvoie déjà une promesse 
 //qui peut être attendue avec await. 
 const compt = await Compteur.findOne({Date: heureEtDate}).exec()
console.log(compt)
  if (compt === null) { // ici on vérifie si la variable compt existe avant de créer un nouveau document
      // Afficher la nouvelle valeur du compteur
    // À la fin du processus de remplissage, enregistrer le compteur final dans la base de données
  const nouveauCompteur = new Compteur({ total1: totalRempli, total2: totalRempli, Date:heureEtDate, Heure: heureInsertion });
  nouveauCompteur.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Compteur final enregistré : ${totalRempli}`);
    }

  });
  } else {
    // mettre à jour le document 
    const updateResult = await Compteur.findOneAndUpdate({"_id": compt._id}, {"total1": totalRempli, "total2": totalRempli, "Heure": heureInsertion});
  }
  console.log(`Compteur : ${totalRempli}`);

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
  console.log('Serveur démarré au port ${3001}')/* apres avoir ecouter le port 3001 affiche les données */
})