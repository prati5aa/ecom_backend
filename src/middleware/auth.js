const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()
const {SELLER,BUYER}=require('../constants')


const authenticate = (req, res, next) => {
    const token= req.headers.authorization.split(' ')[1]
    // console.log(token)
    if(!token)
    {
        res.status(401).send({message:'pleasea authenticate'})
    }

    const user= jwt.verify(token,process.env.jwt_secret)
    req.user=user
    next()
}

const isSeller=(req,res,next)=>
{
    // console.log(req.user)
    if(req.user.role===SELLER)
    {
        next()
    }
   else {
res.status(403).send({message:'forbidden'})
    }
}
const isBuyer=(req,res,next)=>
    {
        if(req.user.role===BUYER)
        {
            next()
        }
       else {
    res.status(403).send({message:'forbidden'})
        }
    }

module.exports=
{
    authenticate,
    isSeller,
    isBuyer
}
