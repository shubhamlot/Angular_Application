const express = require('express');
const router = express.Router();
const user = require('../model/Users');

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

module.exports = router;