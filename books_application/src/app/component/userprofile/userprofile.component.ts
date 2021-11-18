import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

type userInfoSchema = {
	firstname: string;
	lastname: string;
	email: string;
	isadmin: boolean;
	rentedbooks: []
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

<<<<<<< HEAD
  user: User;

  isLogedIn: boolean = false;
  constructor(public userService: UserService) { 

=======
  user: userInfoSchema;
  isLoggedIn: boolean = false;
  constructor(private userService: UserService) { 
>>>>>>> userAuth
  }

  ngOnInit(): void {
    this.getUserDetails()
  }


  getUserDetails(){
    this.userService.userProfileInformation().subscribe(
      result => {
<<<<<<< HEAD
        // console.log(result);
        if(!this.userService.isLogedIn){
          this.user = result;
          this.isLogedIn = this.userService.isLogedIn;
=======
        console.log(result);
        if(this.userService.isLoggedIn){
          this.user = result;
          this.isLoggedIn = this.userService.isLoggedIn;
        }else{
          window.alert('Please Login');
>>>>>>> userAuth
        }
      }
    );
  }



}
