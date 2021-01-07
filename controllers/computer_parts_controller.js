const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/cp_items', (req, res) => {
    res.render('cp_items')
})

/*
router.get('/cp_items',(req, res) => {
    **send a json data with items count, item name, item image, item price, item discount**
})
*/

module.exports = router