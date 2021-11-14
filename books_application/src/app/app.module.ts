import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBooksComponent } from './component/home-books/home-books.component';
import {HttpClientModule} from '@angular/common/http';
import { CreatebookComponent } from './component/createbook/createbook.component';
import { UpdatebookComponent } from './component/updatebook/updatebook.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './component/details/details.component';
import { RentAbookComponent } from './rent-abook/rent-abook.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeBooksComponent,
    CreatebookComponent,
    UpdatebookComponent,
    DetailsComponent,
    RentAbookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
