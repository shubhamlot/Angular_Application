import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isadmin:Boolean = false;
  user: any;

  constructor(public userservice:UserService) { 
    this.isadmin = userservice.isadmin
    console.log(this.isadmin)
  }

  ngOnInit(): void {
    this.isadmin=true

    this.loadUserName();
  }

  loadUserName() {
    this.userservice.userProfileInformation().subscribe(
      result => {
       
        if(this.userservice.loggedIn()){
          this.user = result;
          // console.log(this.user);
        }
        
      }
    );
  }

}
