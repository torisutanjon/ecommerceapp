const mongoose = require('mongoose')

mongoose.set('userCreateIndex', true)

const itemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Image,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Items', itemSchema)