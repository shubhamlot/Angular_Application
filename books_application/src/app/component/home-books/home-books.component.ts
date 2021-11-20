import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import {Books} from '../../Books'
import { HttpClient } from '@angular/common/http';
import { Router,Route } from '@angular/router'
import { FormBuilder, Validators } from "@angular/forms";

import { LowerCasePipe } from '@angular/common';
import { UserService } from 'src/app/user.service';
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
  isadmin = false;
  isValidated = false;
  categories: any = ['Mystery','Fiction', 'Educational']
 
  
  constructor(private bookData:BooksService,
              private router:Router,
              private userservice:UserService) {
   this.isadmin = this.userservice.isadmin

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
    console.log(cat)
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

  changeCategory(e:any) {
    if(this.categories != null){
      if(e.target.value == "All"){
        this.bookList()
      }else{
        this.getBookByCat(e.target.value)
      }
    }
  }
}