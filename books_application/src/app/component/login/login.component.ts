import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
	email: string;
	constructor(public userService: UserService, private router:Router) {

	}

	ngOnInit(): void {

	}

	resetForm(): void {
		this.userService.returningUser = {
			email: "",
			password: ""
		}
	}

	onSubmit(): void {
		// this.email = this.userService.returningUser.email; //catch user email to use in user profile

		this.userService.login(this.userService.returningUser).subscribe(
			data => {
				
				if(data) {
					
				 	localStorage.setItem('token', data.token)
					this.userService.isadmin = data.isadmin
					console.log(data.isadmin)
					this.userService.userID = data.userid
					// this.userService.userEmail = this.email //set email in user email in user service
					this.router.navigate(['/'])
				} // redirect to the appropriate page
				else {
					
					this.router.navigate(['/login'])
				}
			},
			error => {
				console.log(error)
				this.router.navigate(['/login'])
			}
		)
		this.resetForm()
	}
}
