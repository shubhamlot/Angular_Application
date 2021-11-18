import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './User'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
	BASE_URL='http://localhost:8000/routes'
	newUser:User
	returningUser:{email:string, password:string}

	isLogedIn: boolean = false;//to be used in userprofile
	userEmail: string;

	constructor(private http: HttpClient) {
		this.newUser = new User("","","","","")
		this.returningUser = {email: "", password: ""}
	}

	signup(user:User){
		return this.http.post(this.BASE_URL+'/signup', user)
	}

	login(user:{email:string, password:string}){
		return this.http.post(this.BASE_URL+'/login', user)
	}


	//retrive user profile data
	userProfileInformation(){
		console.log(this.userEmail);
		console.log(this.isLogedIn);
		return this.http.get<User>(this.BASE_URL+'/user-information/'+"admin@admin.com");

	}

}

