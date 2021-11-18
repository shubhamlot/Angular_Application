const router = require('express').Router()
const { listenerCount } = require('../model/Books')
const book = require("../model/Books")
const user = require("../model/Users")
const {body, validationResult} = require('express-validator')


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
    book.find({category: req.params.category }, (err, data) => {
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
     
    
        if(!data[0].rentedbooks.includes(bookid)){
            
            res.send("user dont have the book")
        }else{
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
             res.json({Response:"Status updated"})
         })
        
        }
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

router.post("/signup", 
    body('firstname').isAlpha().isLength({min : 1}),
    // body('lastname').isAlpha().isLength({min : 0}),
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({min : 5}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    async (req, res) => {
        const errs = validationResult(req)
        if(!errs.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errs.array()
            })
        }
        res.status(200).json({
            success: true,
            message: 'Sign Up Validated'
        })

        var userObj = new user();
        userObj.firstname = req.body.firstname;
        userObj.lastname = req.body.lastname;
        userObj.email = req.body.email;
        userObj.password = req.body.password;

        var duplicateUser = await user.findOne({ email:userObj.email })

        if(duplicateUser) res.send(false);
        else {
            userObj.save((err, result) => {
                if(err) res.send(false);
                res.send(true);
            })
        }
    }
)

router.post("/login", 
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({min : 5}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    async (req, res) => {
        const errs = validationResult(req)
        if(!errs.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errs.array()
            })
        }
        res.status(200).json({
            success: true,
            message: 'Login Validated'
        })

        var userEmail = req.body.email;
        var userPassword = req.body.password;

        var result = await user.findOne({email: userEmail});

        if(result === null) res.send(false);
        else {
            var logInSuccess = result.password === userPassword;

            res.send(logInSuccess);
        }
    }
)

//returns user information
router.get("/user-information/:email", async (req, res) => {
    let email = req.params.email;

    let result = await user.findOne({email: email});
    console.log(result);
    if(result === null) res.send(false);
	else {
		res.send(result);
	}
});

module.exports = router