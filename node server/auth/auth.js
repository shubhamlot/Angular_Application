const passport = require("passport");
const localStrategy = require("passport-local").Strategy; 
const UserModel = require('../model/Users');
const JWTStrategy = require('passport-jwt').Strategy; 
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
	passport.use(
		'signup',
		new localStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				session: false,
				passReqToCallback: true
			},
			async (req, email, password, done) => {
				try {
					const duplicateUser = await UserModel.findOne({ email: req.body.email })

					if(duplicateUser) return done(null, false, { message: 'User already exists' })

					const user = await UserModel.create({"firstname": req.body.firstname, "lastname": req.body.lastname, email, password });
		
					return done(null, user);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.use(
		'login',
		new localStrategy(
			{
				usernameField: 'email',
				passwordField: 'password'
			},
			async (email, password, done) => {
				try {
					const user = await UserModel.findOne({ email });

					if (!user) {
						return done(null, false, { message: 'User not found' });
					}

					const validate = await user.isValidPassword(password);

					if (!validate) {
						return done(null, false, { message: 'Wrong Password' });
					}

					return done(null, user, { message: 'Logged in Successfully' });
				} catch (error) {
					return done(error);
				}
			}
		)
	);
}

passport.use(
	new JWTStrategy(
		{
			secretOrKey: 'TOP_SECRET',
			jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (e) {
				done(e)
			}
		}
	)
)