import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPipe } from './books.pipe';
import { IsbnPipe } from './isbn.pipe';



@NgModule({
  declarations: [
    BooksPipe,
    IsbnPipe
  ],
  exports: [
    BooksPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
