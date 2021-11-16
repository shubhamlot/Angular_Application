/*const LocalStrategy = require("passport-local").Strategy
function intialize(passport){
const authenticateUser=(email,password,done)=>{
    const user=getUserbyEmail(email)
    if(user==null){
        return done(null,false,{message:"No user with this email"})
    }
    if(password==user.password){

    }else{
        return done(null)
    }
}
}
passport.use(new LocalStrategy({usernameField:'email'}),authenticateUser)
passport.serializeUser((user,done)=>{})
passport.deserializeUser((id,done)=>{})*/