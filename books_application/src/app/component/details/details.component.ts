import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/Books';
import { BooksService } from 'src/app/books.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  flag:Boolean
  books:any;
  id:any;
  public isadmin:Boolean
  book_id:any

  constructor(public bookData:BooksService,
              private route:ActivatedRoute,
              private router:Router,
              private sessionSt : SessionStorageService) { }

  ngOnInit(): void {
    this.isadmin=true
    this.id = this.route.snapshot.paramMap.get('id')
    this.details(this.id)
    // Why call this function here?
    this.rentBook()
    this.returnBook()
 
    
  }

  delete(book:Books){
    this.bookData.deleteBook(book).subscribe(
      data=>{console.log("sucess",data)
          alert(`${book.title} has been deleted`)},
      error=>console.error('Error',error)
    )

    return this.router.navigate([""])

  }

  update(book:Books){
    return this.router.navigate([`update/${this.books._id}`])
  }

  // wishlist should work only after login
  addWishList(book: Books) {
    this.bookData.wishlist.push(book);
    this.book_id = localStorage.getItem('wishlist');
    this.book_id = JSON.parse(this.book_id)
   
    this.flag =false
    for(var i=0;i<this.book_id.length;i++){
      if(this.book_id[i]._id == book._id){
        this.flag = true
      }
    }
    if(this.flag){
      alert("Item already in wishlist")
    }else{
      localStorage.setItem('wishlist', JSON.stringify(this.bookData.wishlist));
      alert(`${book.title} has been added to wishlist`)
    }
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
            this.sessionSt.set('cart', JSON.stringify(this.bookData.cartlist));
            alert(this.books.title + ' added to cart!');
           
           }
           
          
         } else {
           alert('Cart only allows 3 items at a time');
          
           
         }
         
        }
        // error => console.error("error"+error)
    //   )
    // }
    return this.router.navigate(["cart"])
  }

  returnBook(){
    if(this.books.rented<=0){
      alert("Returning more copies then rented")
    }else{
    this.bookData.returnBooks(this.books).subscribe(
      data=>{
        console.log(data)
        alert("Thank you")
        return this.router.navigate([""])
      },
      error=>{
        alert("user dont have the rented copy")
        console.error("error"+error)
        return this.router.navigate([""])
      }
        
    )
    
    }

  }

}
