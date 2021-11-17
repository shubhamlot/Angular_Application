import { RentbookService } from './../../rentbook.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rent-abook',
  templateUrl: './rent-abook.component.html',
  styleUrls: ['./rent-abook.component.css']
})
export class RentAbookComponent implements OnInit {

  constructor(public rentservice:RentbookService,private route:ActivatedRoute,private router:Router) { }
  
  ngOnInit(): void {
  }

  onRent(){

  }

  onReturn(){

  }

  onDisplay(){

  }
  
}
