import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../services/search.service';
import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppGalleryComponent} from './gallery.component';
import {Observable, of} from 'rxjs';
import {mockGifs, mockOptions} from '../__tests/mocks/mocks';
import {GiphyContent, SearchOptions} from '../app.types';

describe('GalleryComponent', () => {
  let galleryComponent: AppGalleryComponent;
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
    galleryComponent = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.get(SearchService);
  });
  it('should create', () => {
    expect(galleryComponent).toBeTruthy();
  });
  it('should get search data', fakeAsync(() => {
    spyOn(searchService, 'onSearchResults').and.callFake((): Observable<GiphyContent> => {
      return (of(mockGifs));
    });
    spyOn(searchService, 'onSearchTerm').and.callFake((): Observable<SearchOptions> => {
      return (of(mockOptions));
    });
    spyOn(searchService, 'onLoadStatus').and.callFake((): Observable<boolean> => {
      return (of(true));
    });
    galleryComponent.ngOnInit();
    fixture.detectChanges();
    tick(4000);
    fixture.detectChanges();
    expect(galleryComponent.gifData).toEqual(mockGifs);
    expect(galleryComponent.termStr).toEqual('xyz');
  }));

});
