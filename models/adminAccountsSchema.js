const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Admin', adminSchema)