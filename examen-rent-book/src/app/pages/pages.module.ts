import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
