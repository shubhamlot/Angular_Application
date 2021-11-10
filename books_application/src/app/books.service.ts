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
  public booklist:Array<any>
  // data:Array<Books>
  selectedBooks:Books
  constructor(private http: HttpClient) {
    this.selectedBooks=new Books("","","","",0,0)
    
  }

getBooks() {

    return this.http.get(this.BASE_URL+'/getBooks')
    
   }

postBooks(book:Books){
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
  return this.http.put(this.BASE_URL+'/rentBooks/'+book._id,book)
}

returnBooks(book:Books){
  return this.http.put(this.BASE_URL+'/returnBooks/'+book._id,book)
}
}
