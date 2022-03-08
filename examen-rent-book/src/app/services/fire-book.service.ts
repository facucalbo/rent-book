import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, FieldValue } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookInfo, BookStatus } from '../interfaces/firestore.response';

@Injectable({
  providedIn: 'root'
})
export class FireBookService {

  constructor(private http: HttpClient, private db: AngularFirestore ) { }

  getBook( id: string ): Observable<BookInfo> {
    return this.http.get<BookInfo>(`${ environment.url }/api/librosIngresados/${ id }`);
  }

  lending( isbn: string, email: string, id: string ) {

    this.joinLending( isbn, email );

    return this.http.get(`${ environment.url }/api/prestamos/${isbn}`);
  }

  rentBook( isbn: string, id: string ): Observable<BookStatus> {
    this.joinBook( isbn, id )
    return this.http.post<BookStatus>(`${ environment.url }/api/librosIngresados/${ id }`, {});
  }

  // add new document if book does not exists
  private async joinBook( isbn: string, id: string ) {
    const bookRef = this.db.collection('librosIngresados').doc( id );
    const bookSnap = await bookRef.get();
    let exist;
    bookSnap.subscribe( b => exist = b.exists );


    if ( !exist ) {
      bookRef.set({
        isbn: isbn,
        id: id,
        cantPrestado: 1
      })
    }
  }

  private async joinLending ( isbn: string, email: string) {
    const prestamoRef = this.db.collection('prestamos').doc(isbn);
    const prestamoSnap = await prestamoRef.get();
    let exist;

    prestamoSnap.subscribe( l => exist = l.exists );

    if ( !exist ) {
      const res = await prestamoRef.set({
        usuariosEmail: arrayUnion( email ),
        isbn: isbn,
      });
    } else {
      const res = await prestamoRef.update({
        usuariosEmail: arrayUnion( email )
      });
    }
  }
}
