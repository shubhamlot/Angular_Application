import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBooksComponent } from './component/home-books/home-books.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CreatebookComponent } from './component/createbook/createbook.component';
import { UpdatebookComponent } from './component/updatebook/updatebook.component';
import { NgForm } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './component/details/details.component';
import { RentAbookComponent } from './component/rent-abook/rent-abook.component'
//import { DetailsComponent } from './component/details/details.component'
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { CartComponent } from './component/cart/cart.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { UserlogComponent } from './component/userlog/userlog.component';
import { MenuComponent } from './component/menu/menu.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeBooksComponent,
    CreatebookComponent,
    UpdatebookComponent,
    DetailsComponent,
    RentAbookComponent,
	  SignupComponent,
	  LoginComponent,
    CartComponent,
    WishlistComponent,
    MenuComponent,
    UserprofileComponent,
    ChangepasswordComponent,
    UserlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularWebStorageModule,
	// NgForm,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


