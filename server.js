// Require our dependencies
const express = require('express');
const fruits = require('./models/fruits');
const methodOverride = require('method-override');

// Initialize Express App
const app = express();

// Configure Application Settings

// Handle/connect to database


// Mount middleware
app.use(express.static('public'));

// app.use(function (req, res, next) {
//     console.log('I will run with each request');
//     req.timeStamp = new Date();
//     next();
// });

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
// This middleware reads form data from incoming requests that involve
// form submissions

// this middleware will create req.body -> this object represents the request body

// this middleware makes public assets available to the client


// Mount routes

// Always think INDUCES

// Index

app.get('/fruits', (req, res) => {
    res.render('index.ejs', { fruits });
});

// New

app.get('/fruits/new', (req, res) => {
    res.render('new.ejs');
});


// Create

app.post('/fruits', (req, res) => {
    // we need to add an id to req.body to satisfy the id property requirement
    req.body.id = fruits.length + 1;
    // we need to cast the 'on' value to a boolean

    req.body.readyToEat = !!req.body.readyToEat

    fruits.push(req.body);

    res.redirect('/fruits') // send a response to the client to ask the client to make another request
    // we redirect every time data is changed
    // data creation
    // updates to the data
    // deletion of data
});


// Show Route
app.get('/fruits/:id', (req, res) => {
    const foundFruit = fruits.find(function (fruit) {
        return fruit.id === Number(req.params.id)
    });

    res.render('show.ejs', {
        foundFruit
    });
});


// Delete Route
app.delete('/fruits/:id', (req, res) => {
    const fruitToDelete = fruits.find((fruit) => {
        return fruit.id === Number(req.params.id)
    })
    fruits.splice(fruits.indexOf(fruitToDelete), 1)
    res.redirect('/fruits')
})


// Edit form route
app.get('/fruits/:id/edit', (req, res) => {
    const fruitToEdit = fruits.find((fruit) => {
        return fruit.id === Number(req.params.id)
    })
    res.render('edit.ejs', { fruitToEdit })
})

// Put (update) Route
app.put('/fruits/:id', (req,res)=>{
    const fruitToEdit = fruits.find((fruit) => {
        return fruit.id === Number(req.params.id)
    })
    fruitToEdit.name = req.body.name
    fruitToEdit.color = req.body.color
    fruitToEdit.readyToEat = !!req.body.readyToEat
    res.redirect('/fruits')
})


// Tell the app to listen for requests on port 3000
app.listen(3000, () => console.log('Express is listening'));