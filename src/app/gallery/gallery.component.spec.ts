import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../services/search.service';
import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppGalleryComponent} from './gallery.component';
import {Observable, of} from 'rxjs';
import {mockGifs, mockOptions} from '../__tests/mocks/mocks';
import {GiphyContent} from '../app.types';
import {async} from 'q';

describe('GalleryComponent', () => {
  let loaderComponent: AppGalleryComponent;
  let fixture: ComponentFixture<AppGalleryComponent>;
  let searchService: SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [HttpClientTestingModule, NgbPaginationModule],
      providers: [SearchService, HttpClient],
      declarations: [AppGalleryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppGalleryComponent);
    loaderComponent = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.get(SearchService);
  });
  it('should create', () => {
    expect(loaderComponent).toBeTruthy();
  });
  it('should get search data', fakeAsync(() => {
    spyOn(searchService, 'onSearchResults').and.callFake((): Observable<GiphyContent> => {
      return (of(mockGifs));
    });
    spyOn(searchService, 'onLoadStatus').and.callFake((): Observable<boolean> => {
      return (of(true));
    });
    loaderComponent.ngOnInit();
    fixture.detectChanges();
    tick(4000);
    fixture.detectChanges();
    expect(loaderComponent.gifData).toEqual(mockGifs);
  }));

});
