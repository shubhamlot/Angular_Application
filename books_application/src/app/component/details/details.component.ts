import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/Books';
import { BooksService } from 'src/app/books.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  flag:Boolean
  books:any;
  localCart: Array<any> = []; 
  id:any;

  constructor(public bookData:BooksService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.details(this.id)
    // Why call this function here?
    this.rentBook()
    this.returnBook()
  }

  details(id: string){
    this.bookData.getBookDetails(id).subscribe(res=>{
      this.books = res
      console.log(this.books)
    })
  }

  // add to cart
  rentBook() {
    if(this.books.copies < 1) {
      alert("Copies are over!!!!")
    } else {

         if(this.bookData.cartlist.length < 3) {

           this.flag =false
           for(var i=0;i<this.bookData.cartlist.length;i++){
             if(this.bookData.cartlist[i]._id == this.id){
               this.flag = true
             }
           }
           if(this.flag){
            alert("item already in cart")
           }else{
            this.bookData.cartlist.push(this.books);
            localStorage.setItem('cart', JSON.stringify(this.bookData.cartlist));
            alert(this.books.title + 'added to cart!');
           }
          
         } else {
           alert('Cart only allows 3 items at a time');
         }
        }
        // error => console.error("error"+error)
    //   )
    // }
  }

  returnBook(){
    if(this.books.rented<=0){
      alert("Returning more copies then rented")
    }else{
    this.bookData.returnBooks(this.books).subscribe(
      data=>{
        console.log(data)
      },
      error=>console.error("error"+error)
     
    )
    
    }

  }

}
