import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/pages/auth/auth.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor( public fb: FormBuilder, private router: Router, private auth: AuthComponent) {

    this.createListener();
   }

  public forma: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]],
    phone: ['', [Validators.required, Validators.minLength(4)]],
    locality: ['', [Validators.required, Validators.minLength(3)]]
  })

  createListener() {
    this.forma.valueChanges.subscribe( control => {})
  }

  noValid( field: string ) {
    return this.forma.controls[field].errors && this.forma.controls[field].touched
  }

  toLogInPage() {
    this.router.navigate(['/auth', 'login'])
  }

  save() {

    if ( this.forma.invalid ) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      })
      return ;
    }

    this.auth.postUser(this.forma.value);
    this.forma.reset();
  }

}
