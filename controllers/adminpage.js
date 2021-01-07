if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('adminpage')
})

//export the file
module.exports = router