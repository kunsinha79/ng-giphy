import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { GiphyContent, SearchOptions } from '../app.types';

@Injectable()
export class SearchService {

  clientID = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';
  baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${this.clientID}&`;

  searchResults = new BehaviorSubject<GiphyContent | undefined>(undefined);
  searchOptions = new BehaviorSubject<SearchOptions | undefined>(undefined);
  constructor(private httpClient: HttpClient) { }

  search(term: string, page: number, queryString: string): void {
    const URL = this.baseUrl + queryString;
    this.searchOptions.next(
      {
        termStr: term,
        pageNumber: page
      } );
    this.httpClient.get(URL).subscribe((resp: GiphyContent) => {
      this.searchResults.next(resp);
    });
  }

  onSearchResults() {
    return this.searchResults.asObservable();
  }

  onSearchTerm() {
    return this.searchOptions.asObservable();
  }
}
