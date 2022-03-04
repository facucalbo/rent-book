import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/book-response';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {

  @Input() books: Item[] = [];

  constructor( private bookModal: NgbModal) { }

  ngOnInit(): void {
  }

  openModal( modal: any ){
    this.bookModal.open( modal, {size: 'xl' } );
  }


}
