const router = require('express').Router()
const { now } = require('mongoose')
const { listenerCount } = require('../model/Books')
const book = require("../model/Books")
const userlog = require('../model/Userlog')
const user = require("../model/Users")
const {body, validationResult} = require('express-validator')

const bcrypt = require("bcrypt")
const passport = require('passport')
const jwt = require('jsonwebtoken')
// const user = require('../model/Users')
// const user = require('../model/Users')

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
    var copies = 1
    var rented = 0

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

router.put("/rentBooks/:id", verifyToken,async (req,res)=>{
    var bookid = req.params.id
    var copies = req.body.copies
    var rented = req.body.rented
    var email = req.body.email
    // if(copies>0){
        copies-=1
        rented+=1
      
        await book.findOneAndUpdate({_id:bookid},{ $set:{copies:copies,rented:rented} }).then(data=>{
            var ulog=new userlog({email:email,bookid:bookid,book:data.title,dateAndtime:now(),rented:true})
            console.log(ulog)
            ulog.save()
        })
        await user.findOneAndUpdate({email: email},{$push:{rentedbooks:bookid}}).then(data=>{
            
            res.json({Response:"Status updated"})
        })
        
       
    
})


router.get("/rentedbooks", verifyToken,async (req,res)=>{
    var email = req.body.email
    user.find({email: email},(err,data)=>{
        if(err){
            res.json({Response:"No data is found"})
        }else{
            // console.log(data)
            // let rented_books = []
            // for(b of data[0].rentedbooks){
            //     let result = book.findOne({"_id":'618fd07ebdc91f235998e2de'})
            //     let book_info = {}
            //     book_info.title =  result.title
            //     book_info.author = result.author
            //     book_info.category = result.category
            //     rented_books.push(result)
            // }
            // console.log(rented_books)
            // console.log(book.find({"_id":{"$in":data[0].rentedbooks}}))
            res.json(data[0].rentedbooks)
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
      
          await book.findOneAndUpdate({_id:bookid},{ $set:{copies:copies,rented:rented} }).then(d=>{
            var ulog=new userlog({userid:userid,bookid:bookid,book:d.title,dateAndtime:now(),rented:false})
            console.log(ulog)
            ulog.save()
          })
          user.findOneAndUpdate({_id:userid},{$set:{rentedbooks:list}},(err,data)=>{
            res.json({Response:"Status updated"})
         })
        

        }
    }
    })
   
 
    
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

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );
  

router.post(
	'/login',
	async (req, res, next) => {
		passport.authenticate(
			'login',
			async (err, user, info) => {
				try {
					if(err || !user) {
						return next('error')
					}
					req.login(
						user,
						{session: false},
						async (error) => {
							if(error) return next(error)

							const body = { email: user.email };
							const token = jwt.sign(body, 'TOP_SECRET');
                            userid = user._id
                            isadmin = user.isadmin
                            // console.log(isadmin)
							return res.json({token, info, userid, isadmin});
						}
					)
				} catch(e) {
					return next(e);
				}

			}
		)(req, res, next);
	}
)

/*
router.post("/login", async (req, res) => {
	var userEmail = req.body.email;
	var DbPassword = req.body.password;
    
	var result = await user.findOne({email: userEmail});
    passwordByUser=result.password
    bcrypt.compare(DbPassword,passwordByUser,function(error,ismatch){
        if(error){
            throw error
        }
        else if(!ismatch){
            res.send(false)
        }
        else{
            res.send(true)
        }
    })
})
*/


//returns user information
router.get("/user-information", verifyToken, async (req, res) => {
    let email = req.body.email;

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


router.get("/userlog",async(req,res)=>{
    userlog.find((err,data)=>{
        // console.log(data)
        if(err){
            res.json({Response:"No data found"})
        }else{
            
            res.json(data)
        }
    })
})


//for change in password 
router.post('/change-password', verifyToken,async (req, res)=>{ 
    let email = req.body.email
    let password = req.body.current_password
    let new_password = req.body.new_password
    console.log(password, email, new_password)

    try {
        const User = await user.findOne({ email:email });

        if (!User) {
            return done(null, false, { message: 'User not found' });
        }

        // const validate = await user.isValidPassword(password);

	    // if (!validate) {
		// 	res.send('Enter currect password!!!')
		// }

       try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(new_password,salt)
        const oldPassword = await bcrypt.hash(password,salt)
        new_password = hashedPassword
       }catch{
            console.log('Not able to encrypt');
       }

        user.findOneAndUpdate({email: email}, {password: new_password}, (err, result)=>{
            if(err){
                console.log(err)
                return res.send('not able to update')
            }else{
                return res.status(200).send('Password As been changed!!!')
            }
        })
        

    } catch (error) {
        return error;
    }

})

//verify token middleware
function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'TOP_SECRET')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.body.email = payload.email;
    // console.log(payload.email)
    // console.log(req.email)
    // console.log(req.body.email);
    next()
}





module.exports = router