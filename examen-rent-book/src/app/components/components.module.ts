import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BookGridComponent } from './book-grid/book-grid.component';
import { PipesModule } from '../pipes/pipes.module';

import {NgbModal, ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavbarComponent,
    BookGridComponent
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
