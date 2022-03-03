import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'books'
})
export class BooksPipe implements PipeTransform {

  transform(book: string): string {
    
    if ( book ){
      return book;
    } else {
      return 'assets/no-book.png'
    }
  }

}
