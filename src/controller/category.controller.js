const Joi = require("joi");
const Category = require("../model/category.model");


const categorySchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),

});




const createCategory=async(req,res,next)=>{

    try{
        const {error,value}=categorySchema.validate(req.body)
        if(!error){
            await Category.create(value)
            res.status(200).send("category created successfully")
        }else{
    next(err)
        }
    }catch(err){
        next(err)
    }


}

const getCategories=async(req,res,next)=>{
    try{
        const data=await Category.find({})
        res.status(201).send(data)
    }catch(err){
        next(err)
    }
}



module.exports={
    createCategory,
    getCategories
}