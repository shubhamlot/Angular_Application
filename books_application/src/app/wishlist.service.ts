import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Books } from './Books';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlist: Array<Books> = [];

  constructor(private http: HttpClient) {
    if(localStorage.getItem('wish-list')){
      this.wishlist = JSON.parse(localStorage.getItem('wish-list')!);
    }   
  }

  // addToWishList(book:Books){
  //   if(localStorage.getItem('wish-list')){
  //     this.wishlist = JSON.parse(localStorage.getItem('wish-list')!);
  //   }

  //   this.wishlist.push(book);
  //   localStorage.setItem('wish-list', JSON.stringify(this.wishlist));
  //   this.subject.next(this.wishlist)
  //   console.log(this.wishlist, this.subject);
  // }  

  // getWishList():Observable<Array<Books>>{
  //   // if(localStorage.getItem('wish-list')){
  //   //  this.wishlist  = JSON.parse(localStorage.getItem('wish-list')!);
  //   // }
  //   return this.subject.asObservable();
  // }
  //comment

  addToWishList(book:Books){
    this.wishlist.push(book);
    localStorage.setItem('wish-list', JSON.stringify(this.wishlist));
  }

  get getWishList():Array<Books>{
    return this.wishlist;
  }

}