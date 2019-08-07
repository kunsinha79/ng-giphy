import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {AppGalleryComponent} from './gallery/gallery.component';
import {SearchService} from './services/search.service';
import {AppSearchComponent} from './search/search.component';
import {AppLoaderComponent} from './loader/loader.component';
import {AppErrorComponent} from './app.error.component';

@NgModule({
  declarations: [
    AppComponent,
    AppGalleryComponent,
    AppSearchComponent,
    AppLoaderComponent,
    AppErrorComponent
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
