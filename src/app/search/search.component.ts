import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {ReplaySubject, Subject} from 'rxjs';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class AppSearchComponent implements OnInit, OnDestroy {
  term$ = new ReplaySubject();
  termStr: string;
  unsubscribe$ = new Subject();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.term$.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(1000),
      filter(term => !!term)
    ).subscribe((term: string) => {
      this.termStr = term;
      this.fetchGifs(0);
    });
  }

  fetchGifs(pageNumber: number): void {
    this.searchService.search (this.termStr, pageNumber, `q=${this.termStr}&limit=20&offset=0`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
