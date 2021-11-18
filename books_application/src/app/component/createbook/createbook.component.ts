import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Books } from 'src/app/Books';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {

  // bookModel = new Books("1","new","book","new")
  constructor(public bookservice:BooksService,private router:Router) { 
  }

  ngOnInit(): void {
    
  }


  resetForm(){
    this.bookservice.selectedBooks = {
      _id:"",
      title:"",
      author:"",
      category:"",
      isbn: "",
      copies:0,
      rented:0

    }
  }

  onSubmit(){
    console.log(this.bookservice.selectedBooks)
   this.bookservice.postBooks(this.bookservice.selectedBooks).subscribe(
     data=>console.log("sucess",data),
     error=>console.error('Error',error)
     
   )
   this.resetForm()
   return this.router.navigate([``])
  }
}
