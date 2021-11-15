import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import {Books} from '../../Books'
import { HttpClient } from '@angular/common/http';
import { Router,Route } from '@angular/router'
@Component({
  selector: 'app-home-books',
  templateUrl: './home-books.component.html',
  styleUrls: ['./home-books.component.css']
})
export class HomeBooksComponent implements OnInit {

  books:any
  index:any
  constructor(private bookData:BooksService,private router:Router) { 
   
  }

  ngOnInit(): void {
    this.bookList()
  }

  bookList(){
    this.bookData.getBooks().subscribe((res)=>{
      
      this.books = res
      
    })
  }

  delete(book:Books){
    this.bookData.deleteBook(book).subscribe(
      data=>{console.log("sucess",data)},
      error=>console.error('Error',error)
    )
    this.bookList()

  }

  getBookByCat(cat: string) {
    this.bookData.getBooksbyCat(cat).subscribe((res)=> {
      this.books = res
    })
  }


  gotoPage(pagename:string,book:Books | null){
    if(book == null){
      return this.router.navigate([`/${pagename}`])
    }else{
      return this.router.navigate([`/${pagename}/${book._id}`])
    }
  }

}
