import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
	selector: 'signup',
	templateUrl: 'signup.component.html',
	styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {
	constructor(public userService: UserService, private router:Router) {

	}

	ngOnInit(): void {

	}

	resetForm(): void {
		this.userService.newUser = {
			// _id: "",
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		}
	}

	onSubmit(): void {
	
		this.userService.signup(this.userService.newUser).subscribe(
			data => {
				if(data === true) this.router.navigate(['/']) // redirect to the appropriate page
				else this.router.navigate(['/signup'])
			},
			error => {
				console.log(error)
				this.router.navigate(['/signup'])
			}
		)
		this.resetForm()
	}
}