import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBooksComponent } from './component/home-books/home-books.component';
import {HttpClientModule} from '@angular/common/http';
import { CreatebookComponent } from './component/createbook/createbook.component';
import { UpdatebookComponent } from './component/updatebook/updatebook.component';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { DetailsComponent } from './component/details/details.component';
import { RentAbookComponent } from './rent-abook/rent-abook.component'
=======
import { DetailsComponent } from './component/details/details.component'
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { CartComponent } from './component/cart/cart.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
>>>>>>> 92ad1548597cf7616b2409b4b6168f2a2342ffc4

@NgModule({
  declarations: [
    AppComponent,
    HomeBooksComponent,
    CreatebookComponent,
    UpdatebookComponent,
    DetailsComponent,
<<<<<<< HEAD
    RentAbookComponent
=======
	  SignupComponent,
	  LoginComponent,
    CartComponent,
    WishlistComponent
>>>>>>> 92ad1548597cf7616b2409b4b6168f2a2342ffc4
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
	// NgForm,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
