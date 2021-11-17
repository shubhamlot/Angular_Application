const router = require('express').Router()
const { listenerCount } = require('../model/Books')
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

router.put("/:userid/rentBooks/:id",async (req,res)=>{
    var bookid = req.params.id
    var copies = req.body.copies
    var rented = req.body.rented
    var userid = req.params.userid

    // if(copies>0){
        copies-=1
        rented+=1
        console.log("hi")
        await book.findOneAndUpdate({_id:bookid},{ $set:{copies:copies,rented:rented} })
        await user.findOneAndUpdate({_id:userid},{$push:{rentedbooks:bookid}}).then(data=>{
            res.json({Response:"Status updated"})
        })
        
       
    // }else{
    //     res.json({Response:"copies are over"})
    // }
    
})


router.get("/:user/rentedbooks",async (req,res)=>{
    var userid = req.params.user
    user.find({_id:userid},(err,data)=>{
        if(err){
            res.json({Response:"No data is found"})
        }else{
            res.json(data[0].rentedbooks)
            // res.json(data)
        }
    })
})

router.put("/:user/returnBooks/:id",async (req,res)=>{
    var bookid = req.params.id
    var userid = req.params.user
    
    var rented = req.body.rented
    var copies = req.body.copies
    var list =[]

    user.find({_id:userid}, async (err,data)  =>{
        flag = data[0].rentedbooks.includes(bookid)
        
        if(flag){
        
        copies+=1
        rented-=1
        console.log(copies)
        for(var i=0;i<data[0].rentedbooks.length;i++){
            if(data[0].rentedbooks[i] != bookid){
                list.push(data[0].rentedbooks[i].toString())
            }
            
        }
      
        
          await book.findOneAndUpdate({_id:bookid},{ $set:{copies:copies,rented:rented} })
          user.findOneAndUpdate({_id:userid},{$set:{rentedbooks:list}},(err,data)=>{
             console.log(data)
             res.json({Response:"Status updated"})
         })
        
        }
    })
   
    // console.log(flag)
    // if(rented<0){
    //     res.json({Response:"More rented then total"})
    // }else{
      
    //     copies+=1
    //     rented-=1
    //     await book.findOneAndUpdate({_id:_id},{ $set:{copies:copies,rented:rented} })
    //     res.json({Response:"Status updated"})
    // }
    
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

	var duplicateUser = await user.findOne({ email:userObj.email })

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

//returns user information
router.get("/user-information/:email", async (req, res) => {
    let email = req.params.email;

    let result = await user.findOne({email: email});
	
    if(result === null) res.send(false);
	else {
		const userInfo = {};
		userInfo.firstname = result.firstname;
		userInfo.lastname = result.lastname;
		userInfo.email = result.email;
		userInfo.isadmin = result.isadmin;
		userInfo.rentedbooks = result.rentedbooks;
		res.send(userInfo);
	}
});

module.exports = router