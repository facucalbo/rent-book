import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/pages/auth/auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public fb: FormBuilder, private router: Router, private auth: AuthComponent) { }

  forma: FormGroup = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required]
  })

  createListener() {
    this.forma.valueChanges.subscribe( control => {})
  }

  toRegisterPage() {
    this.router.navigate(['/auth', 'register'])
  }

  noValid( field: string ) {
    return this.forma.controls[field].errors && this.forma.controls[field].touched
  }
  
  save() {

    if ( this.forma.invalid ) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      })
      return ;
    }

    this.auth.postUser(this.forma.value);
    
    console.log( this.forma.value );
    
    this.forma.reset();
  }
}
