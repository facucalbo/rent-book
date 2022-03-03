import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
