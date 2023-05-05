const express = require('express');/* recupere la variable express dans la boite express */
const mongoose  = require('mongoose'); //gere link api base de donnees
const Model = require('./models/users');
const Compteur = require('./models/compteur');
const jwt = require("jsonwebtoken");
require('dotenv').config();/* pour recuperer le fichier env */
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors') //configuration des differentes requettes pour acceder aux ressources
// const jwt = require("jsonwebtoken");
const routes = require('./routes/routes');
const cron = require('node-cron'); // planificateur pour l'insertion avec le temps
const moment = require('moment'); // planificateur pour le moment exact de l'insertion

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

var url = "mongodb+srv://fadalba:Thiaroye44@cluster0.vk1j3ac.mongodb.net/soutenance";


/* var temoin = '0' */


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
    remplit = data.split('/');
    var nbr_rempli = data.slice(0, 1); //decoupe de la temperature

    //console.log(data.split('/'));
    io.emit('donne', {"quantité": nbr_rempli});
    io.emit('quantité',nbr_rempli);

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



 // nouvelle methode insertion
 let totalRempli = 0;

parser.on('data', (data) => {
  // Mettre à jour le compteur
  totalRempli++;


  
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

  console.log(`Compteur : ${totalRempli}`);


  /* // A tester
// Fonction pour calculer les totaux à chaque 23h59mn59s
function calculerTotaux() {
  const dateDebut = new Date(); // Date et heure actuelles
  dateDebut.setHours(0, 0, 0, 0); // Début de la journée à 00h00mn00s

  const dateFin = new Date(); // Date et heure actuelles
  dateFin.setHours(23, 59, 59, 999); // Fin de la journée à 23h59mn59s

  // Utilisation de la méthode aggregate() pour filtrer les documents de la collection "compteur"
  Compteur.aggregate([ // Compteur est le nom de ma fonction
    // Filtrer les documents entre dateDebut et dateFin
    { $match: { Date: { $gte: dateDebut, $lt: dateFin } } },
    // Calculer la somme de total1 et total2
    {
      $group: {
        _id: null,
        total1: { $sum: '$total1' },
        total2: { $sum: '$total2' }
      }
    }
  ]).exec((err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(result); // Afficher les totaux calculés
  });
}

// Exécution de la fonction calculerTotaux() à chaque 23h59mn59s
setInterval(calculerTotaux, 1000 * 60 * 60 * 24); // 24 heures
 */

async function calculerTotalG1() {
  const debutJour = moment().startOf('day');
  const finJour = moment().endOf('day');

  const resultats = await Compteur.aggregate([
    {
      $match: {
        date: { $gte: debutJour.toDate(), $lte: finJour.toDate() }
      }
    },
    {
      $group: {
        _id: {
          annee: { $year: '$date' },
          mois: { $month: '$date' },
          jour: { $dayOfMonth: '$date' }
        },
        total1: { $sum: '$total1' }
       
      }
      
    }
  ]);

  return resultats;
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
  console.log('Serveur démarré au port ${3001}')/* apres avoir ecouter le port 3001 affiche les données */
})