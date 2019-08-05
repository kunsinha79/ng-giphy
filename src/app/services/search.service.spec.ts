import {SearchService} from './search.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {GiphyContent, SearchOptions} from '../app.types';
import {of} from 'rxjs';

describe ('SearchService', () => {
  let service: SearchService;
  let http: HttpClient;
  const mockGifs: GiphyContent = {
    data: [{
      id: 1,
      image: []
    },
      {
        id: 1,
        image: []
      }],
    meta: {
      status: 200,
      msg: 'Hello',
      response_id: '12345'
    },
    pagination: {
      count: 2,
      offset: 0,
      total_count: 10
    }
  };
  const mockOptions: SearchOptions = {termStr: 'xyz', pageNumber: 0};
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService, HttpClient]
    });
    service = TestBed.get(SearchService);
    http = TestBed.get(HttpClient);
    service.searchResults.next(undefined);
    service.searchOptions.next(undefined);
    spyOn(http, 'get').and.returnValue(of(mockGifs));
  });
  it('should be created', () => {
    service = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
  it('should have empty searchResults details', () => {
    expect(service.searchResults.getValue()).toBeUndefined();
  });
  it('should have empty searchOptions details', () => {
    expect(service.searchOptions.getValue()).toBeUndefined();
  });
  it('should have searchResults and  searchOptions details', () => {
    service.search('xyz', 0, '');
    expect(http.get).toHaveBeenCalled();
    expect(service.searchOptions.getValue()).toEqual(mockOptions);
    expect(service.searchResults.getValue()).toEqual(mockGifs);
  });
  it( 'getSearchTerm should return xyz and 0', () => {
    service.search('xyz', 0, '');
    service.onSearchTerm().subscribe(obj =>
      expect(obj).toEqual(mockOptions)
    );
  });
  it( 'onResults should return mockGifs', () => {
    service.search('xyz', 0, '');
    service.onSearchResults().subscribe(obj =>
      expect(obj).toEqual(mockGifs)
    );
  });
});
