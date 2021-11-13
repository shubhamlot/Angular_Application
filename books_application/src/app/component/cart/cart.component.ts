import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  id:any;
  books: any;

  constructor(public bookData:BooksService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    //this.id = this.route.snapshot.paramMap.get('id')
    //console.log(this.bookData.cartlist.length);
    this.books = localStorage.getItem('cart');
    this.books = JSON.parse(this.books);
    console.log(this.books);
  }

}
