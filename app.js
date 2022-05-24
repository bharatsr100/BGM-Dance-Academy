const express= require("express");
const path= require("path");
const fs= require("fs");
const { urlencoded } = require("body-parser");
const app= express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}

//Define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });

  const Contact = mongoose.model('Contact', contactschema);

const port=8000;

//Express specific stuff
app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded());

//Pug specific stuff
app.set('view-engine','pug') //set the tempelate engine as pug
app.set('views',path.join(__dirname, 'views')) //set the view directory

//Endpoints
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params); 
})

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params); 
})

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params); 
})
app.post('/contact',(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug'); 
})

//Start the Server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});
