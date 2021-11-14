import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './User'


@Injectable({
  providedIn: 'root'
})
export class UserService {
	BASE_URL='http://localhost:8000/routes'
	newUser:User
	returningUser:{email:string, password:string}

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

}

