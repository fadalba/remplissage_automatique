const mongoose = require('mongoose');

const rempli = new mongoose.Schema({
nbr_rempli: {
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