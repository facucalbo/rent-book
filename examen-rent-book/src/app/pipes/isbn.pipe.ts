import { Pipe, PipeTransform } from '@angular/core';
import { IndustryIdentifier } from '../interfaces/book-response';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(isbn: IndustryIdentifier): string[] {
    if ( isbn ){
      return ['no-pipe'];
    }
    return isbn;
  }

}
