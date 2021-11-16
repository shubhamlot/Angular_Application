import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from './Books';

@Injectable({
  providedIn: 'root'
})
export class RentbookService {

  BASE_URL='http://localhost:8000/routes'
  public booklist:Array<any>
  // data:Array<Books>
  selectedBooks:Books
  //book: any;
  constructor(private http: HttpClient) {
    this.selectedBooks=new Books("","","","",0,0)

  }

 rentBook(book:Books){
    //1.add book to user collection
    //2.remove book from local storage
   return this.http.post(this.BASE_URL+'/rentBooks'+book._id,book)
}

 returnBook(book:Books){
   //1.remove book from user collection
   return this.http.put(this.BASE_URL+'/returnBooks/'+book._id,book)
 }

 displayrentedbooks(){
   //1.display book from user collection
   return this.http.get(this.BASE_URL+'/getRentedBooks')
  
 }

}
