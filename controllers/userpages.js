require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('./../models/userAccountsSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authToken } = require('./../config/ensureAuth')

router.get('/userpage', authToken, (req, res) => {
    res.render('userpage')
})
router.get('/orderpage', (req, res) => {
    res.render('orderpage')
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    try {
        accessToken = null
        req.flash('success_msg', 'Logout Successfuly')
        res.redirect('/user/login')
        console.log(accessToken)
    } catch (err) {
        console.log(err)
    }
})


//login post route
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (!user) return req.flash('error_msg', 'Username or Password Incorrect'), res.redirect('/user/login')
        await bcrypt.compare(password, user.password, (err, validPass) => {
            if (err) return req.flash('error_msg', 'Error Occured'), console.log(err), res.redirect('/user/login')
            if (!validPass) return req.flash('error_msg', 'Username or Password Incorrect'), res.redirect('/user/login')
            const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            accessToken = token
            console.log(token + 'token from jwt.sign')
            res.header('Authorization', `Bearer ${accessToken}`)
            res.redirect('/user/userpage')
        })
    } catch (err) {
        console.log(err)
    }
})

//logout route
router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/')
})

//export the file
module.exports = router