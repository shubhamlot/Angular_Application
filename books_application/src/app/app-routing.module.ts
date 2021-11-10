import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatebookComponent } from './component/createbook/createbook.component';
import { DetailsComponent } from './component/details/details.component';
import { HomeBooksComponent } from './component/home-books/home-books.component';
import { UpdatebookComponent } from './component/updatebook/updatebook.component';

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
    path:'',
    component:HomeBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
