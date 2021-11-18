import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Books } from './Books';
import {catchError, tap, map} from 'rxjs/operators';
import { UserService } from './user.service';




@Injectable({
  providedIn: 'root'
})
export class BooksService {
  BASE_URL='http://localhost:8000/routes'

  public cartlist:Array<any> = [];
  public wishlist:Array<any> = [];
  public userid:string = ""
  selectedBooks:Books
  constructor(private http: HttpClient,private userservice:UserService) {
    this.selectedBooks=new Books("","","","",0,0)
    this.userid = userservice.userID
  }

getBooks() {

    return this.http.get(this.BASE_URL+'/getBooks')

  }



  getBooksbyCat(cat: string) {
    return this.http.get(this.BASE_URL +'/getBooksbyCat/'+cat)
  }

postBooks(book:Books) {
    // console.log(book)
    return this.http.post(this.BASE_URL+'/addBooks',book)
}

deleteBook(book:Books){
    return this.http.delete(this.BASE_URL+'/deleteBooks/'+book._id)
}

updateBook(book:Books){
  book.copies=1
  console.log(book)
  return this.http.put(this.BASE_URL+'/editBooks/'+book._id,book)
}

getBookDetails(book_id:string){
  return this.http.get(this.BASE_URL+'/getBooks/'+book_id)
}

rentBooks(book:Books){
  console.log()

  // var userid = "6191dec2ab87ca5adeba6202" //temporary
  return this.http.put(this.BASE_URL+"/"+this.userservice.userID+'/rentBooks/'+book._id,book)
}

returnBooks(book:Books){
  // var userid = this.//temporary
  // console.log(this.userid)
  return this.http.put(this.BASE_URL+"/"+this.userservice.userID+'/returnBooks/'+book._id,book)
}
}
