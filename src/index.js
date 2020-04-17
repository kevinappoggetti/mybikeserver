require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');//gestisce il JSON
const authRoutes = require('./routes/authRoutes');

const app = express(); // Ogni volta che viene fatto una richiesta GET HTTP alla route,
                      //vogliamo eseguire tale funzione
app.use(bodyParser.json());
app.use(authRoutes);

const mongoURI= 'mongodb+srv://mybike:mybikepassword1234@cluster0-xd85k.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=>{
  console.log("Connected to Mongo");
});
mongoose.connection.on('error',(err)=>{
  console.lerror('Error connecting to mongo', err)
});

app.get('/', (req,res)=>{
  res.send('Hi there');
});

app.listen(3000, ()=>{
  console.log('Listening on port 3000');
})
