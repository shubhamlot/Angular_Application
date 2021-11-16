import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Books } from './Books';
import {catchError, tap, map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BooksService {
  BASE_URL='http://localhost:8000/routes'

  public cartlist:Array<any> = [];
  public wishlist:Array<any> = [];

  selectedBooks:Books
  constructor(private http: HttpClient) {
    this.selectedBooks=new Books("","","","",0,0)
    
  }

getBooks() {

    return this.http.get(this.BASE_URL+'/getBooks')

  }

  getBooksbyCat(cat: string) {
    return this.http.get(this.BASE_URL +'/getBooksbyCat/'+cat)
  }

postBooks(book:Books) {
    console.log(book)
    return this.http.post(this.BASE_URL+'/addBooks',book)
}

deleteBook(book:Books){
    return this.http.delete(this.BASE_URL+'/deleteBooks/'+book._id)
}

updateBook(book:Books){
  return this.http.put(this.BASE_URL+'/editBooks/'+book._id,book)
}

getBookDetails(book_id:string){
  return this.http.get(this.BASE_URL+'/getBooks/'+book_id)
}

rentBooks(book:Books){
  var userid = "6192356b125ee3a77cbef7eb" //temporary
  return this.http.put(this.BASE_URL+"/"+userid+'/rentBooks/'+book._id,book)
}

returnBooks(book:Books){
  var userid = "6192356b125ee3a77cbef7eb"//temporary
  return this.http.put(this.BASE_URL+"/"+userid+'/returnBooks/'+book._id,book)
}
}
