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
    const user= req.body;
        db.add(user)
        .then(user => {
            if (user) {
                res.json(user);
            }
            else{
                res.status(400).json({
                    errorMessage: "Please provide name and bio for the user." 
                })
            }
            }
        )
        .catch(err=> {
            res.status(500).json({
                err: err
            })
        })
})




server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
           if(users) {
            res.json(users)
           } 
           else{
               res.status(500).json({
                error: "The users information could not be retrieved."
               })
           }
        })
        .catch(err=> {
            res.status(500).json({
                err:err
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if(user){
                res.json(user);
            }
            else{
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                err:err
            })
        })

})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deletedUser => {
            if (deletedUser){
                res.json(deletedUser);
            }
            else{
                res.status(500).json({
                    error: "The user could not be removed"
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                err: err
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes= req.body;
    
    db.update(id, changes)
        .then(updated => {
            if(updated) {
                res.json(updated)
            }
            else{
                res.status(500).json({
                    error: "The user information could not be modified."
                })
            }
            
        })
        .catch(err=> {
            res.status(500).json({
                err:err
            })
        })
})