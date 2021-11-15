const router = require('express').Router()
const book = require("../model/Books")
const user = require("../model/Users")

router.get("/getBooks",(req,res)=>{
    book.find({},(err,data)=>{
        if(err){
            res.json({Response:"error"})
        }
        else{
            res.json(data)
        }
    })
})

router.get("/users",(req,res)=>{
    user.find({},(err,data)=>{
        res.json(data)
    })
})

router.get("/getBooks/:id",(req,res)=>{
    var _id = req.params.id

    book.findById({_id:_id},(err,data)=>{
        if(err){
            res.json({Response:"err no data found"})
        }
        else{
            res.json(data)
        }
    })
    
})

router.get("/getBooksbyCat/:category", (req, res) => {
    book.find({ category: req.params.category }, (err, data) => {
        if (err) {
            res.json({ Response: "err no data found" })
        }
        else {
            res.json(data)
        }
    })
})

router.post("/addBooks",(req,res)=>{

    var title = req.body.title
    var author = req.body.author
    var category = req.body.category
    var copies = req.body.copies
    var rented = req.body.rented

    var newbook = new book({title:title,author:author,category:category,copies:copies,rented:rented})

    newbook.save((err)=>{
        if(err){
            res.json({Response:"error in saving"})
        }
        else{
            res.json({Response:"data is saved"})
        }
    })

})

router.put("/editBooks/:id",async (req,res)=>{
    var _id = req.params.id
    var data = req.body
    await book.findOneAndUpdate({_id:_id},{ $set:data  })
    res.json({Response:"Status updated"})
})

router.put("/rentBooks/:id",async (req,res)=>{
    var _id = req.params.id
    var copies = req.body.copies
    var rented = req.body.rented

    if(copies>0){
        copies-=1
        rented+=1
        await book.findOneAndUpdate({_id:_id},{ $set:{copies:copies,rented:rented} })
        await user.findOneAndUpdate({_id:"6191dec2ab87ca5adeba6202"},{$push:{rentedbooks:_id}})
        
        res.json({Response:"Status updated"})
    }else{
        res.json({Response:"copies are over"})
    }
    
})


router.put("/returnBooks/:id",async (req,res)=>{
    var _id = req.params.id
    var rented = req.body.rented
    var copies = req.body.copies

    
    if(rented<0){
       
        res.json({Response:"More rented then total"})
    }else{
      
        copies+=1
        rented-=1
        await book.findOneAndUpdate({_id:_id},{ $set:{copies:copies,rented:rented} })
        res.json({Response:"Status updated"})
    }
    
})




router.delete("/deleteBooks/:id",(req,res)=>{
    var _id = req.params.id
    book.deleteOne({_id:_id},(err)=>{
        if(err){
            res.json({Response:"error"})
        }
        else{
            res.json({Response:"book deleted"})
            
        }
    })
})

router.post("/signup", async (req, res) => {
	var userObj = new user();
	userObj.firstname = req.body.firstname;
	userObj.lastname = req.body.lastname;
	userObj.email = req.body.email;
	userObj.password = req.body.password;
     console.log(req)
	var duplicateUser = await user.findOne({ email:userObj.email })
    
  
    // console.log(duplicateUser)
	if(duplicateUser) res.send(false);
	else {
        console.log(userObj.email)
		userObj.save((err, result) => {
			if(err) res.send(false);
			else res.send(true);
		})
	}
})

router.post("/login", async (req, res) => {
	var userEmail = req.body.email;
	var userPassword = req.body.password;

	var result = await user.findOne({email: userEmail});

	if(result === null) res.send(false);
	else {
		var logInSuccess = result.password === userPassword;

		res.send(logInSuccess);
	}
})

module.exports = router