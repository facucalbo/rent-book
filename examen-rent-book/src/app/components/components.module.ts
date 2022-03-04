import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BookGridComponent } from './book-grid/book-grid.component';
import { PipesModule } from '../pipes/pipes.module';

import {NgbModal, ModalDismissReasons, NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



@NgModule({
  declarations: [
    NavbarComponent,
    BookGridComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    NavbarComponent,
    BookGridComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class ComponentsModule { }
