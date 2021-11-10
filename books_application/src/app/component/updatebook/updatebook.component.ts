import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books.service';
import { ActivatedRoute } from '@angular/router'
import { Books } from 'src/app/Books';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {

  constructor(public bookservice:BooksService,private route:ActivatedRoute,private router:Router) { }

  id:any
  bookModel:any
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    
    this.createModel()
    this.onSubmit()
  }

  createModel(){
    this.bookservice.getBookDetails(this.id).subscribe(res=>{
      this.bookModel = res
    })
    

  }

  onSubmit(){
    this.bookservice.updateBook(this.bookModel).subscribe(
      data=>console.log("success"+data),
      err=>console.error("error"+err)
      
    )

    return this.router.navigate([``])
  }
  

}
