import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/Books';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  books: any;

  constructor(public bookData:BooksService) { }

  ngOnInit(): void {
    this.loadWish();
  }

  loadWish() {
    
    this.books = localStorage.getItem('wishlist');
    this.books = JSON.parse(this.books);
  }

  removeItem(book: Books) {
    // remove item from bookservice cartlist
    for(let i = 0; i < this.bookData.wishlist.length; i++) {
      if(this.bookData.wishlist[i]._id == book._id) {
        this.bookData.wishlist.splice(i, 1);
      }
    }

    // update local storage
    localStorage.setItem('wishlist', JSON.stringify(this.bookData.wishlist));

    // update view
    this.loadWish();
  }

}