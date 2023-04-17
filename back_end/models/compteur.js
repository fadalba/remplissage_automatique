const mongoose = require('mongoose');

const rempli = new mongoose.Schema({
nbr_rempli: {
type: String
},

Date: {
type: Date
},
Heure: {
    type: Date
    }

})


module.exports = mongoose.model('compteur', rempli);/* compteur nom de la collection */