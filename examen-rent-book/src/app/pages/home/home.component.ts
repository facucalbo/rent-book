import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/book-response';
import { BookService } from 'src/app/services/book-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Item[] = [];
  public param: string = '';
  public pos = 0;

  constructor( private bookService: BookService ) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight)

    if ( this.pos > max ){
      this.bookService.searchBook( this.param )
      .subscribe( books => {
        this.books.push( ...books.filter( b => b.volumeInfo.imageLinks ) )
      })
    }
  }

  searchBook(selectedBook: string) {

    this.bookService.resetIndex();

    this.param = selectedBook;
    this.bookService.searchBook( selectedBook )
    .subscribe( books => {
      this.books = books.filter( b => b.volumeInfo.imageLinks )
      console.log(this.books);
    })
  }

  resetBookArray(){
    this.books = [];
  }



}
