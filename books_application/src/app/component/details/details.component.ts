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

  books:any
  id:any
  constructor(public bookData:BooksService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.details(this.id)
    this.rentBook()
    this.returnBook()
  }

  details(id:string){
    this.bookData.getBookDetails(id).subscribe(res=>{
      this.books = res
    })
  }



  rentBook(){
    if(this.books.copies<1){
      alert("Copies are over!!!!")
    }else{
    this.bookData.rentBooks(this.books).subscribe(
      data=>{
        console.log(data)
        this.books.copies-=1
        this.books.rented+=1
      },
      error=>console.error("error"+error)
    )
   
    }
    // return this.router.navigate([``])
  }



  returnBook(){
    if(this.books.rented<=0){
      alert("Returning more copies then rented")
    }else{
    this.bookData.returnBooks(this.books).subscribe(
      data=>{
        console.log(data)
        this.books.rented-=1
        this.books.copies+=1
      },
      error=>console.error("error"+error)
     
    )
    
    }
    // return this.router.navigate([``])
  }



}
