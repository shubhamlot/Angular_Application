var mongoose = require('mongoose')
var schema = mongoose.Schema

var bookSchema = new schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        // required:true
    },
    category:{
        type:String,
        required:true
    },
    ISBN:{
        type:Number,
        // required:true
    },



    ///the following items have to be deleted once everything is fixed vvv
    copies:{
        type:Number,
        required:true,
        // min:0
    },
    rented:{
        type:Number,
        required:true
    }

    ///above items^^^
})

var book = mongoose.model('Book',bookSchema,'books')
module.exports = book