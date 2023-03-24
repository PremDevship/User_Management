const mongoose = require('mongoose')

const user = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    Userimage:{
        type: String,
        required: true
    },
    Firstname: {
        type: String,
        required: true,
    },
    Lastname: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('userdata',user)