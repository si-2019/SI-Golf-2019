const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Samira');
});

router.get('/uloga/:idKorisnik', function (req,res){

    let idKorisnik = req.params.idKorisnik;
    db.korisnik.findOne({attributes:['idUloga'], where:{id:idKorisnik}}).then(function(k){
        db.uloga.findOne({attributes:['naziv'], where:{id:k.idUloga}}).then(function(u){
            let odg = {uloga:u.naziv};
            res.end(JSON.stringify(odg));
        }).catch(function(err){let greska = {error:"error"};
            res.end(JSON.stringify(greska));});
    }).catch(function(err){
        let greska = {error:"error"};
        res.end(JSON.stringify(greska));
    });
});

router.get('/mojiPredmeti/:idKorisnik', function(req,res){
    let idKorisnik = req.params.idKorisnik;
    let uloga = req.query.uloga;

    if(uloga=='PROFESOR'){
        db.predmet.findAll({where: {idProfesor:idKorisnik}}).then(function(predmeti){
            let resPredmeti = predmeti.map(p => {return {id:p.id, naziv:p.naziv, opis:p.opis}});
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify(resPredmeti));
        }).catch(function(err){
            console.log(err);
            let greska = {error:"error"};
            res.end(JSON.stringify(greska));
        });
    }

    
})


module.exports = router;