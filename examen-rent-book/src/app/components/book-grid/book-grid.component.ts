import { AfterContentChecked, Component, DoCheck, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/book-response';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FireBookService } from 'src/app/services/fire-book.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {

  @Input() books: Item[] = [];
  available: boolean = false;

  constructor( private bookModal: NgbModal, private fbService: FireBookService, private authService: AuthService,
                private db: AngularFirestore) { }

  ngOnInit(): void {
    console.log(this.books);
  }

  openModal( modal: any ){
    this.bookModal.open( modal, {size: 'xl', animation: true } );
  }

  closeModal() {
    this.bookModal.dismissAll('');
  }


// no puedo verificar los libros prestados porque me tira error 404 diciendo que el id no existe, aunque esta contemplado
// en el servidor express, al momento de hacer la query no me toma la respuesta para 404 que yo quiero

  // verifPrestados( id: string ){

  //   this.fbService.getBook( id )
  //     .subscribe( res => {
  //       console.log(res);
  //       if ( res.cantPrestado < 3) {
  //         this.available = true;
  //       }
  //     })
  // }
}
