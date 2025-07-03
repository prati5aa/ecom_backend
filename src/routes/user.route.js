const express = require('express');
const router=express.Router()
const {createUser, login} = require('../controller/user.controller')

router.post('/signin',createUser)

router.post('/login',login)

// router.route('/user/:id').delete().patch()


module.exports=router