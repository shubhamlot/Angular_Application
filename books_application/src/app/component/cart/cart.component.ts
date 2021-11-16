import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/Books';
import { BooksService } from 'src/app/books.service';
import { LocalStorage, LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @LocalStorage()
  books: any;

  constructor(public bookData:BooksService, private localSt: LocalStorageService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    //this.books = this.localSt.get('cart');
    this.books = localStorage.getItem('cart');
    this.books = JSON.parse(this.books);
  }

  removeItem(book: Books) {
    // remove item from bookservice cartlist
    for(let i = 0; i < this.bookData.cartlist.length; i++) {
      if(this.bookData.cartlist[i]._id == book._id) {
        this.bookData.cartlist.splice(i, 1);
      }
    }

    // update local storage
    localStorage.setItem('cart', JSON.stringify(this.bookData.cartlist));

    // update view
    this.loadCart();
  }

  checkOut() {
    for(let i =0; i < this.books.length; i++) {
      this.bookData.rentBooks(this.books[i]).subscribe(
        data=>{
          console.log(data)
        },
        error=>console.error("error"+error)
      )
    }

    // after checkout, cart should be empty
    localStorage.removeItem('cart');
    this.loadCart();

  }
}
