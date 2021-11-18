import { Books } from './../../Books';
import { RentbookService } from './../../rentbook.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rent-abook',
  templateUrl: './rent-abook.component.html',
  styleUrls: ['./rent-abook.component.css']
})
export class RentAbookComponent implements OnInit {
  book:any;
  user:any;
  constructor(public rentservice:RentbookService,private route:ActivatedRoute,private router:Router) { }
  
  ngOnInit(): void {
  }

  rentBook(){
    if(this.book.copies==0){
    this.rentservice.rentBook(this.book).subscribe(data=>{
      this.rentservice.userlist.push(this.book.id);
      alert(this.book.title+' is rented!')
    },
    error => console.error("error"+error)

    )
  }
  }

  returnBook(){
    this.rentservice.returnBook(this.book).subscribe(data=>{
      this.book.copies=1;
    },
    error=>console.error("error"+error)
    )
  }
  
  displayRented(){
    //error over here
    // this.rentservice.displayrentedbooks().subscribe(data=>{
    //   this.book=data
    // },
    // error=>console.error("error"+error)

    // )
  }
}
