import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  showEdit: boolean = false;
  firstname: string;
  lastname: string;
  
  constructor(private userService: UserService, private _router: Router) { 
  }

  ngOnInit(): void {
    this.getUserDetails()
  }


  getUserDetails(){
    this.userService.userProfileInformation().subscribe(
      result => {
       
        if(this.userService.loggedIn()){
          this.user = result;
          // console.log(this.user);
        }
        
      },
      err => {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              window.alert('Unauthorized request!!')
              this._router.navigate(['/login'])
            }
            if(err.status === 500){
              window.alert('Internal Server Error')
              this._router.navigate(['/login'])
            }
          }
      }
    );
  }

  changeProfile(){
    let userInfo = {firstname:this.firstname, lastname:this.lastname}
    this.userService.changeProfile(userInfo).subscribe(
      res => {
        this.user = res
        window.alert('profile has been updated! please refresh..')
      },
      err => console.log(err)
    )
    this.showEditor()
  }

  show(){
    this.isShow = !this.isShow;
    console.log(this.isShow);
  }

  showEditor(){
   this.showEdit= !this.showEdit;
  }

  Logout(){
    this.userService.logOut();
  }

}
//comment{}