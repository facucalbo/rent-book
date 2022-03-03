import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookResponse, Item } from '../interfaces/book-response'
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // request example: https://www.googleapis.com/books/v1/volumes?q=harry+potter&startIndex=0&maxResults=20

  baseUrl: string = 'https://www.googleapis.com/books/v1/volumes'
  index = 0;

  get params() {
    return{
      startIndex: 0,
      maxResults: 20,
      index: this.index
    }
  }

  constructor( private http: HttpClient) { }

  searchBook( textParam: string ): Observable<Item[]> {

    const params = { ...this.params, q: textParam}
    
    return this.http.get<BookResponse>(`${ this.baseUrl }`, { params })
      .pipe(
        map( resp => resp.items ),
        tap( () => {
          this.params.index += 20;
        })
      )
  }
}
