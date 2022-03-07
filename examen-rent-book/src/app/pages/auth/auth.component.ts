import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserPostRequest } from 'src/app/interfaces/user-request';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor( private router: Router, private db: AngularFirestore, private auth: AuthService, private dataService: DataService) { }

  private invalid: boolean = false;

   async logUser( data: UserPostRequest) {
    const {email, password} = data;
  
    await this.auth.login( email, password ).then( res => {
      console.log(res);
    });

    this.dataService.user = data;

    this.toHome();
   }

   async registerUser( data: UserPostRequest) {
    const {email, password} = data;

    await this.auth.register( email, password ).then( res => {
      console.log(" registered: ", res);
    });

    this.postUser( data );
    this.toHome();
   }

   async postUser( data: UserPostRequest ) {
      const userRef = this.db.collection('user').doc();
      const userData = { ...data, id: userRef.ref.id }
  
      const res = await userRef.set(userData);
   }

   loggedUser() {
     this.auth.getUserLogged().subscribe( res => {
       res?.uid;
     })
   }

   toHome() {
     this.router.navigate(['/home'])
   }

  ngOnInit(): void {
  }

}
