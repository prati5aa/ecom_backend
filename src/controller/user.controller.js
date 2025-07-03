const Joi = require('joi');
 const User = require('../model/user.model');
const bcrypt=require('bcryptjs');
const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const schema = Joi.object({
  username: Joi.string().required()
,

  email: Joi.string()
    .email()
    .required(),

  role: Joi.string()
    .valid('buyer', 'seller')
    .required(),

  password: Joi.string()
    .required()
});

const loginschema = Joi.object({
   
  
    email: Joi.string()
      .email()
      .required(),
  
  
    password: Joi.string()
      .required()
  });
const createUser=async(req,res,next)=>
{
    try{
        const data=req.body
        const {error, value}=schema.validate(data, {
        allowUnknown:true
    });
    if(error)
    {
        throw new Error(error);

    }
    const password=value.password
    delete value.password

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({...value,password:hashedPassword})
    res.status(201).send({message:'User created successfully',user})
}
    catch(err)
    {
        console.log(err)
        res.status(500).send({message:'Internal server error'})
    }
}


const login=async(req,res,next)=>
{

    try{
        const {error,value}=loginschema.validate(req.body)
        // console.log(value)
       
        if(!error)
        {
            let user=await User.findOne({email:value.email})
            console.log(user)
            if(!user)
            {
                res.status(403).send({message:'User not found'})
            }

            const check=await bcrypt.compare(value.password,user.password)
            if(!check)
            {
                res.status(403).send({message:'Invalid password'})
            }

            user={...user.toObject()}
            delete user.password


            const token=jwt.sign(user,process.env.jwt_secret)
            res.status(200).send({token})
            console.log(token)

        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({message:'Internal server error'})
    }
}
module.exports={
    createUser,
    login
}