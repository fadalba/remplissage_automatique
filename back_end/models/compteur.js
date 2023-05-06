const mongoose = require('mongoose');

const rempli = new mongoose.Schema({

total1: {
    type: Number,
    default: 0
},
total2: {
    type: Number,
    default: 0
},

Date: {
type: String
},
Heure: {
    type: String
    }

})


module.exports = mongoose.model('compteur', rempli);/* compteur nom de la collection */