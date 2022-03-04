import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserPostRequest } from 'src/app/interfaces/user-request';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  param = this.activatedRoute.snapshot.params['type'];

  constructor( private activatedRoute: ActivatedRoute, private db: AngularFirestore) {


   }

   async postUser( data: UserPostRequest ) {
     const userRef = this.db.collection('user').doc();
      
     const userData = { ...data, id: userRef.ref.id }

     console.log(userRef.ref.id);

     const res = await userRef.set(userData);     
   }

  ngOnInit(): void {
  }

}
