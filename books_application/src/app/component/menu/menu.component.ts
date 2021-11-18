import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isadmin:Boolean = false
  constructor(private userservice:UserService) { 
    this.isadmin = userservice.isadmin
  }

  ngOnInit(): void {
    this.isadmin=true
  }

}
