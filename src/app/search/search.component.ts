import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ReplaySubject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class AppSearchComponent implements OnInit, OnDestroy {
  term$ = new ReplaySubject<string | undefined>();
  termStr: string;
  subscriptions = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.subscriptions.push(this.term$.pipe(
      filter(term => !!term)
    ).subscribe((term: string) => {
      this.termStr = term;
      this.subscriptions.push(this.fetchGifs(0));
    }));
  }

  fetchGifs(pageNumber: number): any {
    this.searchService.search (this.termStr, pageNumber, `q=${this.termStr}&limit=20&offset=0`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
