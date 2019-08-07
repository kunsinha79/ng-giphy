import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SearchService} from '../services/search.service';
import {AppSearchComponent} from './search.component';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppGalleryComponent} from '../gallery/gallery.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe ('AppSearchComponent', () => {
  let searchComponent: AppSearchComponent;
  let fixture: ComponentFixture<AppSearchComponent>;
  let searchService: SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbPaginationModule],
      providers: [SearchService, HttpClient],
      declarations: [AppSearchComponent, AppGalleryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppSearchComponent);
    searchComponent = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.get(SearchService);
    searchComponent.term$.next(undefined);
  });
  it('should create', () => {
    expect(searchComponent).toBeTruthy();
  });
  it('should call fetchGifs when input element gets value', fakeAsync(() => {
    searchComponent.ngOnInit();
    fixture.detectChanges();
    spyOn<any>(searchComponent, 'fetchGifs');
    const input = fixture.debugElement.query(By.css('#keyword'));
    const inputElement = input.nativeElement;

    inputElement.value = 'puppies';
    const event = new KeyboardEvent('keyup', {
      bubbles : true, cancelable : true, shiftKey : false
    });
    inputElement.dispatchEvent(event);
    tick(1000);
    fixture.detectChanges();
    expect(searchComponent.termStr).toEqual('puppies');
    expect(searchComponent.fetchGifs).toHaveBeenCalled();
  }));
  it( 'should call fetchGifs when term$ gets a value', fakeAsync(() => {
    spyOn<any>(searchComponent, 'fetchGifs');
    searchComponent.term$.next('puppies');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(searchComponent.termStr).toEqual('puppies');
    expect(searchComponent.fetchGifs).toHaveBeenCalled();
  }));
});
