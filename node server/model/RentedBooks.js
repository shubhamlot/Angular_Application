var mongoose = require('mongoose')
var schema = mongoose.Schema
var Books = require('./Books')
var RentedBookSchema = new schema({
    userid:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:Books
        }
    ],

	bookid:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Books
        }
    ]
})

var rentedbook = mongoose.model('RentedBook',userSchema,'rentedbooks')
module.exports = rentedbook