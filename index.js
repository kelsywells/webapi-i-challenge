// implement your API here
const express = require('express');

const server = express();

server.listen(4000, () => {
    console.log('Server is running on port 4000...');
})

const db = require('./data/db');
// server.get('/', (req, res) => {
//     res.send('<h2>Hello World</h2>');
// }) >>>>>>>> test

server.post('/api/users', (req, res) => {
    const { name, bio }= req.body;
        if (!name || !bio) {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })}
        else {
            db.add(req.body)
                .then(user => {
                    res.status(201).json(user);
            })
            .catch(err=> {
                res.status(500).json({
                    err: err,
                    errorMessage: 'There was an error while saving the user to the database'
                })
            })
}})


server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err=> {
            res.status(500).json({
                err:err,
                errorMessage: 'The users information could not be retrieved.'
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if(user){
                res.status(200).json(user);
            }
            else{
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                err:err,
                errorMessage: 'The user information could not be retrieved.'
            })
        })

})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deletedUser => {
            if (deletedUser){
                res.status(200).json({
                message: 'the user was deleted.';
            })
            }
            else{
                res.status(404).json({
                message: 'The user with the specified ID does not exist.' 
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                err: err,
                error: "The user could not be removed"
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    
    if (!name || !bio){
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.' 
        })
    }
    else {
        users.update(req.params.id, req.body) 
        .then(user => {
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({
                message: 'The user with the specified ID does not exist.'    
                })
            }
        })
        
        .catch(err=> {
            res.status(500).json({
                err:err,
                errorMessage: 'The user information could not be modified.'
            })
        })
    }
})