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
import { UserlogComponent } from './component/userlog/userlog.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'update/:id',
    component:UpdatebookComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'create',
    component:CreatebookComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'details/:id',
    component:DetailsComponent,
    canActivate: [AuthGuard]
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
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'userlog',
    component:UserlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rent-abook',
    component: RentAbookComponent
  },
  {
    path:'',
    component:HomeBooksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
