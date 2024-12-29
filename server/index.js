const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./Models/User')


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud')

app.get('/' ,(req ,res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create',  (req, res) =>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log('Updating user with ID:', id, 'and data:', req.body); // Debug log
    UserModel.findByIdAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        },
        { new: true } // Return the updated document
    )
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch((err) => res.json(err));
});



app.listen(3001, () => {
    console.log("Server is running ");
  });