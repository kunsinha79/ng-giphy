import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {AppGiphyComponent} from './gallery/gallery.component';
import {SearchService} from './services/search.service';
import {AppSearchComponent} from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    AppGiphyComponent,
    AppSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
