import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './User'

type signupSchema = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
};

type loginSchema = {
	email: string;
	password: string;
}

type userInfoSchema = {
	firstname: string;
	lastname: string;
	email: string;
	isadmin: boolean;
	rentedbooks: []
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
	BASE_URL='http://localhost:8000/routes'


	newUser: signupSchema;
	returningUser:loginSchema;

	isLoggedIn: boolean = false;//to be used in userprofile
	userEmail: string;
	isadmin: boolean

	constructor(private http: HttpClient) {
		this.newUser = new User("","","","","")
		this.returningUser = {email: "", password: ""}
	}

	signup(user:signupSchema){
		return this.http.post(this.BASE_URL+'/signup', user)
	}

	login(user:loginSchema){
		return this.http.post(this.BASE_URL+'/login', user)
	}

	//retrive user profile data
	userProfileInformation(){
		return this.http.get<userInfoSchema>(this.BASE_URL+'/user-information/'+this.userEmail);
	}

}

