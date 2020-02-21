const express = require('express');
const port = 3000
const app = express()
const db = require('./models');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.post('/login', (req,res,next)=>{
    db.User.findOne({
        where : {
            email : req.body.email
        }
    })
    .then(response => {
        if(!response){
            res.status(400).json({message : 'email not registered'})
        } else {
            if(response.password === req.body.password){
                const token = jwt.sign(JSON.stringify(response), 'jovi123')
                res.status(200).json({ access_token : token })
            } else {
                res.status(400).json({message : 'wrong password'})
            }
        }
    })
})

app.post('/register', (req,res,next)=>{
    db.User.create({
        email : req.body.email,
        name : req.body.name,
        password : req.body.password
    })
    .then(response => {
        let token = jwt.sign(JSON.stringify(response),'jovi123')
        res.status(200).json({ access_token : token })
    })
    .catch(err => {
        res.status(400).json({ message : err })
    })
})

//authorization
function auth(req,res,next){
    try{
        let user = jwt.verify(req.headers.access_token,'jovi123')
        req.user = user
        next()
    } catch (err) {
        res.status(400).json({ message : 'Please login first' })
    }
}
app.use(auth)

app.get('/trips', (req,res,next)=>{
    db.Trip.findAll()
    .then(response => {
        if(response){
            res.status(200).json(response)
        } else {
            res.status(400).json({ message : 'Internal server error'})
        }
    })
    .catch(err => {
        res.status(400).json({ message : err })
    })
})

app.get('/trips/:id', (req,res,next)=>{
    db.Trip.findByPk(req.params.id)
    .then(response => {
        if(response){
            res.status(200).json(response)
        } else {
            res.status(400).json({ message : 'trip doesnt exist'})
        }
    })
    .catch(err => {
        res.status(400).json({ message : err })
    })
})

app.post('/trips', (req,res,next)=>{
    db.Trip.create({
        title : req.body.title,
        location : req.body.location,
        date : req.body.date,
    })
    .then(response => {
        res.status(200).json({trip : response, message : 'sucess create trip'})
    })
    .catch(err => {
        res.status(400).json({ message : err })
    })
})

app.put('/trips/:id', (req,res,next)=>{
    db.Trip.update({
        title : req.body.title,
        location : req.body.location,
        date : req.body.date,
    }, {
        where : {
            id : req.params.id
        }
    })
    .then(response => {
        db.Trip.findByPk(req.params.id)
        .then(response => {
            if(response){
                res.status(200).json({trip : response, message : 'sucess update trip'})
            } else {
                res.status(400).json({ message : 'trips not found' })
            }
        })
    })
    .catch(err => {
        res.status(400).json({ message : err })
    })
})

app.get('/trips/random', (req,res,next)=>{
    axios.get('https://randomuser.me/api/')
    .then(({data}) => {
        console.log(data)
        res.status(200).json({
            date : data.results[0].registered.date,
            location : data.results[0].location.city
        })
    })
    .catch(err => {
        res.status(400).json({ message : err })
    })
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});