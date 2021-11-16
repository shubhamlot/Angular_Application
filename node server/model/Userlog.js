var mongoose = require('mongoose')
const user = require('./Users')
var schema = mongoose.Schema

var userLog= new schema({
    userid:{
        type:schema.Types.ObjectId,
        ref:user
    },

    bookid:{
        type:schema.Types.ObjectId,
        ref:Books
    },

    dateAndtime:{
        type:Date,
        required:true
    }

})

var userlog = mongoose.model('Userlog',userLogschema,'userLog')
module.exports = userlog