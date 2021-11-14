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
  constructor(private http: HttpClient) {
    this.selectedBooks=new Books("","","","",0,0)

  }

 rentBook(){
    //1.add book to user collection
    //2.remove book from local storage
 }

 returnBook(){
   //1.remove book from user collection
 }

 displayrentedbooks(){
   //1.display book from user collection
 }

}
