import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './User'
import { Router } from '@angular/router';

type changepwd = {
	current_password: string,
	new_password: string,
	confirm_password: string
}

type signupSchema = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	isadmin: boolean
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
	isadmin:boolean =false
	userID:string =""
	userEmail: string;
	// isadmin: boolean

	constructor(private http: HttpClient, private _router: Router) {
		this.newUser = new User("","","","",false)
		
		this.returningUser = {email: "", password: ""}
	}

	signup(user:signupSchema){
		console.log(user)
		return this.http.post(this.BASE_URL+'/signup', user)
	}

	login(user:loginSchema){
		
		return this.http.post<{token:string, info:{},userid:string,isadmin:boolean}>(this.BASE_URL+'/login', user)
	}

	//retrive user profile data
	userProfileInformation(){
		return this.http.get<userInfoSchema>(this.BASE_URL+'/user-information');
	}



	//below methods are for autherization 
	loggedIn(){
		return !!localStorage.getItem('token')
	}

	getToken(){
		return localStorage.getItem('token')
	}

	logOut(){
		localStorage.removeItem('token')
		this._router.navigate(['/login'])
	}

	//for changing password
	changePassword(changepwd: changepwd){
		return this.http.post<any>(this.BASE_URL+'/change-password', changepwd)
	}

	changeProfile(userInfo:{firstname:string, lastname:string}){	
		return this.http.put<userInfoSchema>(this.BASE_URL+'/change-profile', userInfo)
	}
}

