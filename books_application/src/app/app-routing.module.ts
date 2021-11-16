import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CreatebookComponent } from './component/createbook/createbook.component';
import { DetailsComponent } from './component/details/details.component';
import { HomeBooksComponent } from './component/home-books/home-books.component';
import { LoginComponent } from './component/login/login.component';
import { RentAbookComponent } from './component/rent-abook/rent-abook.component';
import { SignupComponent } from './component/signup/signup.component';
import { UpdatebookComponent } from './component/updatebook/updatebook.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';

const routes: Routes = [
  {
    path:'update/:id',
    component:UpdatebookComponent
  },
  {
    path:'create',
    component:CreatebookComponent
  },
  {
    path:'details/:id',
    component:DetailsComponent
  },
  {
	path:'signup',
	component:SignupComponent
  },
  {
	path: "login",
	component:LoginComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'user-profile',
    component: UserprofileComponent
  },
  {
    path:'',
    component:HomeBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
