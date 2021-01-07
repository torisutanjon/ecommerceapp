const mongoose = require('mongoose')

mongoose.set('userCreateIndex', true)

const recordSchema = new mongoose.Schema({

    months: {
        type: String,
        required: false
    },
    data: [{
        productName: {
            type: String,
            required: false
        },
        productbrand: {
            type: String,
            required: false
        },
        count: {
            type: Number,
            required: true
        }
    }]

})

module.exports = mongoose.model('Record', recordSchema)