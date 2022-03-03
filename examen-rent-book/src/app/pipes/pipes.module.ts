import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPipe } from './books.pipe';



@NgModule({
  declarations: [
    BooksPipe
  ],
  exports: [
    BooksPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
