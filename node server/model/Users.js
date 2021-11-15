var mongoose = require('mongoose')
var schema = mongoose.Schema
var Books = require('./Books')
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

var user = mongoose.model('User',userSchema,'users')
module.exports = user