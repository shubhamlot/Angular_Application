import { ActivatedRoute, Router } from '@angular/router';
import { RentbookService } from './../../rentbook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent implements OnInit {
  userlogs: any;

  constructor(public rentservice:RentbookService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.showlog()
  }

  showlog(){
    this.rentservice.showuserlog().subscribe(data=>{
      this.userlogs=data
      console.log(data)
    },
    error=>console.error("error"+error)
    )


  }

}
