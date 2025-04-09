const express = require('express')
const router = express.Router()
const {register,login,time, profile} = require('./user.controller')
const {auth} = require('./auth')

router.post('/register',register)
router.post('/login',login)
router.get('/time',time)
router.get('/profile',auth,profile)


module.exports = router