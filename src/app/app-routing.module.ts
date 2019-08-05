import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppSearchComponent} from './search/seach.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/giphy',
    pathMatch: 'full'
  },
  {
    path: 'giphy',
    component: AppSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
