const express = require('express');
const compter=require('../models/compteur');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const check = require('./midleware');
var MongoClient = require('mongodb').MongoClient;
const router = express.Router();
var url = "mongodb+srv://fadalba:Thiaroye44@cluster0.vk1j3ac.mongodb.net/soutenance";
const Model = require('../models/users');

module.exports = router;

/* pour la connection */
router.post("/login",  async (req, res, next) => {

    let { email, password } = req.body;
    
    let existingUser;

    existingUser = await Model.findOne({ email: email});
console.log(existingUser);
    if (!existingUser) {
      return res.status(400).send("Utilisateur n'existe pas ou archivé!");
    }
  
    //Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).send("mot de passe incoreect");
    }
    
    
    let token;
    try {
      //Générer token avec jwt
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } 

    catch (err) {
      console.log(err);
      const error = new Error("Erreur! Quelque chose s'est mal passée.");
      return next(error);
    }
    console.log(existingUser._id);

    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser._id,
          email: existingUser.email,
          prenom: existingUser.prenom,
          nom: existingUser.nom,
          token: token,
        },      
    });

});

/*  la méthode POST passe les paramètres dans le corps de la requête. */
router.post('/post', async(req, res) => {

const { email, password, prenom, nom} = req.body;
const users = [];

const newUser = Model({
    email,
    password, 
    prenom, 
    nom, 
});

try {

  const oldUser = await Model.findOne({ email });

  if (oldUser) {
    return res.status(409).send("Cet utilisateur existe déja. Veuillez vous connecter");
  }

    const hash = await bcrypt.hash(newUser.password,10);
    newUser.password = hash;

    users.push(newUser);
    /* res.json(newUser); */
    await newUser.save();

    res.status(201).json(newUser);

} catch(error) {
    res.status(400).json({message: error.message})
}

})
/* La méthode GET est utilisée par le navigateur pour 
demander au serveur de renvoyer une certaine ressource. */
router.get('/getAll',check, async(req, res) => {
try{
const data = await Model.find();
res.json(data)
}
catch(error){
res.status(500).json({message: error.message})
}
})
/* Méthode pour affichier un utilisateur par son id */
router.get('/unique/:id', async(req, res) => {
const data = await Model.findById(req.params.id);
res.json(data)
})

/*   pour la mdodification*/
router.patch('/update/:id', async (req, res) => {
try {
const id = req.params.id;
const updatedData = req.body;
const options = { new: true };

if (updatedData.password){
    const hash = await bcrypt.hash(updatedData.password, 10);
    updatedData.password = hash;
    
        const result = await Model.findByIdAndUpdate(
        id, updatedData, options
         );
    
          return  res.send(result);
    
        }


    const result = await Model.findByIdAndUpdate(
        id, updatedData, options
    )

   return res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
})

// Modification mot de passe
// router.route('/updatepass/:id').put( async(req, res) => {
//   console.log(req.body);
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };
//     const ancienpassword= updatedData.ancienpassword
//     const user =await Model.findById(id)
//     const comp = await bcrypt.compare(ancienpassword, user.password)
//     console.log(bcrypt.compare(ancienpassword, user.password));
//     if(!comp){
//       res.status(400).json({message: "veuillez saisir le bon actuel mot de passe!"})
//       return;
//     } 
//     updatedData.newpassword
//     const hash = await bcrypt.hash(updatedData.newpassword, 10);
//     updatedData.newpassword = hash;
    
//     // console.log(hash);
//     // return
//               const result = await Model.findByIdAndUpdate(
//               id, updatedData, options);
//             return  res.send(result);
//   }
//   catch (error) {
//       res.status(400).json({ message: error.message })
//   }
//   })

  /* update by id methode  pour la mdodification*/
router.patch('/updatepass/:id', async (req, res) => {
  const { actuelpassword, newpassword} = req.body;
  console.log(req.body);
try {
const id = req.params.id;
//const updatedData = req.body;
const options = { new: true };
const result = await Model.findOne({_id:id})

const passwordMatch = await bcrypt.compare(actuelpassword,result.password);
console.log(result)

if(!passwordMatch){
  return res.status(400).json({message: 'incorrect password'});
}


const hashedPassword = await bcrypt.hash(newpassword, 10);

result.password = hashedPassword;

await Model.findByIdAndUpdate(id, {password:hashedPassword}, options )

return res.status(200).json({message: 'modifier avec succes'});

} catch(error) {
   res.status(400).json({message: error.message})
}

})

/* delete by id method pour supprimer */

router.delete('/delete/:id', async(req, res) => {
try {
const id = req.params.id;
const data = await Model.findByIdAndDelete(id)
res.send(`Le Document avec le nom ${data.prenom} ${data.nom} a été supprimé..`)
}
catch (error) {
res.status(400).json({ message: error.message })
}
})

/* get all method */
  router.get('/getAllc', async(req, res) => {
    try{
    const data = await compter.find();
    res.json(data)
    }
    catch(error){
    res.status(500).json({message: error.message})
    }
    })

  // 
  router.get('/cpt', async(req, res) => {
    try {
      MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("soutenance");
        var col = dbo.collection('compteur');
        col.deleteMany()
            
    })
    
    
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }

    

    router.post('/cpt', async(req, res) => {

      const { nbr_rempli} = req.body;
      const compteur = [];
      
      const comptage = compteur({
        nbr_rempli 
      
      });
      try {

      
          compteur.push(comptage);
          /* res.json(newUser); */
          await comptage.save();
      
          res.status(201).json(comptage);
      
      } catch(error) {
          res.status(400).json({message: error.message})
      }
      
    })
  

})