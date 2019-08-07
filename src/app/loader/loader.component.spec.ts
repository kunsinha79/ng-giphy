import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../services/search.service';
import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppLoaderComponent} from './loader.component';
import {of} from 'rxjs';

describe('LoaderComponent', () => {
  let loaderComponent: AppLoaderComponent;
  let fixture: ComponentFixture<AppLoaderComponent>;
  let searchService: SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbPaginationModule],
      providers: [SearchService, HttpClient],
      declarations: [AppLoaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppLoaderComponent);
    loaderComponent = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.get(SearchService);
    spyOn(searchService, 'onLoadStatus').and.returnValue(of(true));
  });
  it('should create', () => {
    expect(loaderComponent).toBeTruthy();
  });
  it('should receive a value for isLoading and render img element', () => {
    loaderComponent.ngOnInit();
    fixture.detectChanges();
    expect(searchService.onLoadStatus).toHaveBeenCalled();
    expect(loaderComponent.isLoading).toEqual(true);
    const singlePageDebugElement = fixture.debugElement;
    const singlePageTemplate = singlePageDebugElement.nativeElement;
    const elmSinglePageTempate = singlePageTemplate.querySelector('img');
    expect(elmSinglePageTempate).toBeTruthy();
  });
});
