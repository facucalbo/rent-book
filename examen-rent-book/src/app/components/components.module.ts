import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BookGridComponent } from './book-grid/book-grid.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';

import {NgbModal, ModalDismissReasons, NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    NavbarComponent,
    BookGridComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent
  ],
  exports: [
    NavbarComponent,
    BookGridComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ComponentsModule { }
