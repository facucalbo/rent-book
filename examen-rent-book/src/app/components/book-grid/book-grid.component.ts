import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/book-response';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {

  @Input() books: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
