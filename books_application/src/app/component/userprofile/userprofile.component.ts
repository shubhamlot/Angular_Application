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

  user: userInfoSchema = {firstname: "", lastname: "", email: "", isadmin: false, rentedbooks: []};
  isLoggedIn: boolean = false;
  isShow: boolean = false;
  
  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {

    this.userService.userProfileInformation().subscribe(
      result => {
        console.log(result);
        if(this.userService.isLoggedIn){
          this.user = result;
          this.isLoggedIn = this.userService.isLoggedIn;
        }else{
          // window.alert('Please Login');
        }
      }
    );

  }

  show(){
    this.isShow = !this.isShow;
    console.log(this.isShow);
    
  }

}
//comment