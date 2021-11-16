var mongoose = require('mongoose')
var schema = mongoose.Schema
var Books = require('./Books')
const bcrypt=require('bcrypt')
var userSchema = new schema({
    
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
	password:{
		type:String,
		required:true
	},
    isadmin:{
        type:Boolean,
        required:true,
        default:false
    },
    rentedbooks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Books
        }
    ]
})
userSchema.pre('save',async function (next){
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next()
    }catch(error){
        next(error)
    }
})
var user = mongoose.model('User',userSchema,'users')
module.exports = user