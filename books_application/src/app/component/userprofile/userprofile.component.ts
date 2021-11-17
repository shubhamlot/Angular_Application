import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: User;
  isLogedIn: boolean = false;
  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {

    this.userService.userProfileInformation().subscribe(
      result => {
        console.log(result);
        if(this.userService.isLogedIn){
          this.user = result;
          this.isLogedIn = this.userService.isLogedIn;
        }else{
          window.alert('Please Login');
        }
      }
    );

  }

}
//comment