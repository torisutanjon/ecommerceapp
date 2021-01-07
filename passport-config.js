// const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('./models/userAccountsSchema')
const Admin = require('./models/adminAccountsSchema')
const passport = require('passport')
const { Strategy } = require('passport')

const option = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}

const strategy = new JWTStrategy(option, (payload, done) => {
    User.findOne({ username: payload.sub })
        .then((user) => {
            if (!user) return done(null, false)
            return done(null, user)
        })
        .catch(err => done(err, null))
})

module.exports = (passport) => {
    passport.use(strategy)
}



//-----------------------------------------------------------------------/


// module.exports = function(passport) {
//     passport.use(
//         new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
//             if (username.includes(".admin")) {
//                 Admin.findOne({ username: username })
//                     .then(admin => {
//                         if (!admin) {
//                             return done(null, false, { message: 'No Admin Existed' })
//                         }
//                         //match password'
//                         bcrypt.compare(password, admin.password, (err, isMatched) => {
//                             if (err) throw err
//                             if (isMatched) {
//                                 return done(null, admin)
//                             } else {
//                                 return done(null, false, { message: 'Password Incorrect' })
//                             }
//                         })
//                     })
//                     .catch(err => console.log(err))

//             } else {
//                 //if the user logged in
//                 //-----------------------------------------------------------------------------------------------------------------------
//                 // match username
//                 User.findOne({ username: username })
//                     .then(user => {
//                         if (!user) {
//                             return done(null, false, { message: 'No User Existed' })
//                         }
//                         //match password'
//                         bcrypt.compare(password, user.password, (err, isMatched) => {
//                             if (err) throw err
//                             if (isMatched) {
//                                 return done(null, user)
//                             } else {
//                                 return done(null, false, { message: 'Password Incorrect' })
//                             }
//                         })
//                     })
//                     .catch(err => console.log(err))

//             }
//         })
//     )
//     passport.serializeUser((user, done) => {
//         done(null, user.id)
//     })
//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, acc) => {
//             done(err, acc)
//         })
//     })
// }