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
    isbn:{
        type:String,
        //required:true
    },
    copies:{
        type:Number,
        required:true,
        // max:1
    },
    ///the following items have to be deleted once everything is fixed vvv
    rented:{
        type:Number,
        required:true
    }

    ///above items^^^
})

var book = mongoose.model('Book',bookSchema,'books')
module.exports = book
