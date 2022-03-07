import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser = this.authService.getUserLogged();

  constructor( private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  authPage( type: string ) {
    this.router.navigate(['/auth', type])
  }

  logOut(){
    this.authService.logOut();
  }
  

}
