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

  flag:Boolean
  book_id:any
  books:any
  index:any
  isadmin = true;
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

