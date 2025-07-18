const mongoose=require('mongoose')
const { PassThrough } = require('stream')


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        },
        

    password:{
        type:String,
        required:true,
    }
    
},{
    timestamps:true,
}
)

const User=mongoose.model('User',userSchema)
module.exports=User