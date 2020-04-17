//Qualsiasi cosa relativamente all'autenticazione
const express = require('express');
const mongoose = require('mongoose'); //Possiamo utilizzare lo user model con questo require.
const User = mongoose.model('User');
const router = express.Router();

router.post('/inserisciutente', async (req, res)=>{ //ogni volta che si fa una post a questo URL verrà attivata la funzione
  const {nome,cognome,datadinascita,citta,indirizzo,cap,email,walletaddress,password} = req.body;
  try{
    const user = new User({nome,cognome,datadinascita,citta,indirizzo,cap,email,walletaddress,password});
    await user.save(); // operazione asincrona per salvare i dati su Mongo.
    res.send(true);
  }catch(err){
    return res.status(422).send(err.message); //messaggio fornito automaticamente da Mongo
  }
})

router.post('/autenticazione', async (req,res)=>{
  const {walletaddress, password} = req.body;
  if(!walletaddress||!password){
    return res.status(422).send({error:"You must provide the walletaddress or the password"});
  }
  const user= await User.findOne({walletaddress}); //cerchiamo lo user con quella particolare mail -> Op. asincrona
  if(!user){
    return res.status(404).send({error:'Wallet Address not found'});
  }
  try{
    await user.comparePassword(password);
    res.send(true);
  }catch(err){
    return res.status(422).send({error:'Invalid password or wallet address'});
  }
});

router.post('/verificautente', async (req,res)=>{
  const {walletaddress} = req.body;
  if(!walletaddress){
    return res.status(422).send({error:"You must provide the walletaddress or the password"});
  }
  const user= await User.findOne({walletaddress}); //cerchiamo lo user con quella particolare mail -> Op. asincrona
  if(!user){
    res.send(false);
  }
  else{
    res.send(true);
  }
})

module.exports = router;
