import { Books } from './../../Books';
import { RentbookService } from './../../rentbook.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-rent-abook',
  templateUrl: './rent-abook.component.html',
  styleUrls: ['./rent-abook.component.css']
})
export class RentAbookComponent implements OnInit {
  books:any = [];
  user:any;
  constructor(public rentservice:RentbookService,private route:ActivatedRoute,private router:Router,
    private bookService: BooksService) { }
  
  ngOnInit(): void {
    this.loadLibrary();
  }

  loadLibrary() {
    this.rentservice.displayrentedbooks().subscribe(data=>{
      
      for(let b of data){
        this.bookService.getBookDetails(b).subscribe(
          res => {this.books.push(res)
          console.log(res)}
        )
      }
      console.log(this.books)
    }, 
    error=>console.error("error"+error))
  } 

  rentBook(){
    if(this.books.copies==0){
    this.rentservice.rentBook(this.books).subscribe(data=>{
      this.rentservice.userlist.push(this.books.id);
      alert(this.books.title+' is rented!')
    },
    error => console.error("error"+error)

    )
  }
  }

  returnBook(){
    this.rentservice.returnBook(this.books).subscribe(data=>{
      this.books.rented =0;
      this.books.copies=1;
    },
    error=>console.error("error"+error)
    )
    this.loadLibrary();
  }
  
}
