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
    category:{
        type:String,
        required:true
    },
    copies:{
        type:Number,
        required:true,
        // min:0
    },
    rented:{
        type:Number,
        required:true
    }
})

var book = mongoose.model('Book',bookSchema,'books')
module.exports = book