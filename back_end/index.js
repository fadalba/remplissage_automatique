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
    var heureEtDate = laDate  + '-' + mois + '-' +  numMois; 
   
   
 
 // nouvelle methode insertion 
 let totalRempli = 0;

parser.on('data', (data) => {
  // Mettre à jour le compteur
  totalRempli++;

  // Afficher la nouvelle valeur du compteur
  console.log(`Compteur : ${totalRempli}`);
});

// À la fin du processus de remplissage, enregistrer le compteur final dans la base de données
const nouveauCompteur = new Compteur({ total: totalRempli, Date:heureEtDate, Heure: heureInsertion });
nouveauCompteur.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Compteur final enregistré : ${totalRempli}`);

/*     /// Cron job pour exécuter la fonction à 23h59min59sec tous les jours   ok 
cron.schedule(' * * * * *', async () => { // format de l'heure : sec min HH et *** signifie tous les jours
  // Calculer les variables totales pour toutes les données de la journée
  const startDate = moment().startOf('day').toDate();
  const endDate = moment().endOf('day').toDate();

  const results = await DataModel.find({ Date: { $gte: startDate, $lte: endDate } }).exec();
  
  const totalSum = results.reduce((acc, curr) => acc + curr.nbr_rempli, 0);

  console.log(`Le totale des bouteilles remplies aujourd'hui est ${totalSum}`);

  // calcul
const sommeTotale = new totalRempli({ total: nbr_rempli, Date: startDate, Heure: moment().format('HH:mm:ss') });
sommeTotale.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Somme totale enregistrée : ${totalSum}`);
  }}) 
}); */

// Récupérer la somme des bouteilles remplies pour chaque catégorie
const pipeline = [
  { $group: { _id: '$categorie', total: { $sum: '$bouteillesRemplies' } } }
];

// Mettre à jour les propriétés total1 et total2 de notre base de données
Compteur.bulkWrite([
  { updateOne: { filter: { _id: '644ba5bc872f807cc73f26a5' }, update: { total1: 0 } } }, // je remplace 0 par variable som_tot1
  { updateOne: { filter: { _id: '644ba5bc872f807cc73f26a5' }, update: { total2: 0 } } }// je remplace 0 par variable som_tot2
], { ordered: false });
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