import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppSearchComponent} from './search/search.component';
import {AppErrorComponent} from './app.error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/giphy',
    pathMatch: 'full'
  },
  {
    path: 'giphy',
    component: AppSearchComponent
  },
  {
    path: '**',
    component: AppErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
