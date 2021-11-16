var mongoose = require('mongoose')
const book = require('./Books')
const user = require('./Users')
var schema = mongoose.Schema

var userLog= new schema({
    userid:{
        type:schema.Types.ObjectId,
        ref:user
    },

    bookid:{
        type:schema.Types.ObjectId,
        ref:book
    },

    dateAndtime:{
        type:Date,
        required:true
    },
    //if rented, in view Rented status will be shown to admin
    //otherwise, returne status will be shown
    rented:{
        type:Boolean,
        required:true
    }

})

var userlog = mongoose.model('Userlog',userLogschema,'userLog')
module.exports = userlog