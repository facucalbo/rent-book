import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BookGridComponent } from './book-grid/book-grid.component';



@NgModule({
  declarations: [
    NavbarComponent,
    BookGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    BookGridComponent
  ]
})
export class ComponentsModule { }
