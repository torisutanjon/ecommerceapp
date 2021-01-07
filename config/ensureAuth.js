require('dotenv').config()
const jwt = require('jsonwebtoken')
const atob = require('atob')
const Account = require('./../models/userAccountsSchema')
module.exports = {
    //if still not logged in
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please Login to View')
        res.redirect('/user/login')
    },

    //if already logged in
    notEnsured: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.flash('error_msg', 'Please Logout first')
            res.redirect('/')
        } else {
            return next()
        }
    },
    //-------------------------------------
    authToken: async(req, res, next) => {
        try {
            const token = accessToken
            if (token == null) return res.sendStatus(401), console.log('No Token')
                /*getting the payload just to test*/
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace('-', '+').replace('_', '/') //just got this from the net
                //console.log(JSON.parse(atob(base64)).username)
            const user = await Account.findOne({ username: JSON.parse(atob(base64)).username })
            if (!user) return res.redirect('/user/login'), console.log('not success')
            console.log(user.username)
                /*---------------------------------*/
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403), console.log('Invalid Token')
                req.user = user
                next()
            })
        } catch (err) {
            res.redirect('/user/login'), req.flash('error_msg', 'Login to view')
        }
    }
}