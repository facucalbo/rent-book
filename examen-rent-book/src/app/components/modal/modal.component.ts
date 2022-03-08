import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FireBookService } from '../../services/fire-book.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookGridComponent } from '../book-grid/book-grid.component';
import { Item, IndustryIdentifier } from '../../interfaces/book-response';

@Component({
  selector: 'app-modal',
  providers: [ NgbActiveModal ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() book?: Item;

  constructor( private authService: AuthService, private fbService: FireBookService,
      public activeModal: NgbActiveModal, private bookGridComponent: BookGridComponent ) { }

  ngOnInit(): void {
  }

  rentBook( isbn: any[], id: string ) {
    let isbn10: string;
    try {
      isbn10 = isbn[0].identifier;
      console.log(isbn10);
    }catch ( err ) {
      isbn10 = 'no-isbn';
    }


    console.log(this.authService.getUserLogged.length);
    // cuando se agrega un nuevo libro tira error 404 aunque este contemplado en el server express
    this.fbService.rentBook( isbn10, id )
    .subscribe( res => {
      if ( res.updated ){
        this.authService.getUserLogged().subscribe( u => {
          // uso email para la tabla prestamo
          console.log('usuario registrado: ', u?.email);
          this.fbService.lending( isbn10, u?.email!, id )
          console.log('Prestamo solicitado');
        });
      } else{
        console.log(' No se pudo pedir prestamo porque ya 3 personas lo tienen. ');
      }
    })
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


  closeModal() {
    this.bookGridComponent.closeModal();
  }

}
