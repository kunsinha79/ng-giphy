import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {GiphyContent} from '../app.types';

@Component({
  selector: 'app-giphy',
  templateUrl: './gallery.component.html'
})
export class AppGiphyComponent implements OnInit, OnDestroy {
  gifData: GiphyContent;
  data: Array<any>[];
  isLoading: boolean;
  termStr: string;
  page = 1;
  pageSize = 0;
  private subscriptions = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchService.onSearchResults().subscribe(results => {
        this.gifData = results;
        this.data = this.gifData ? this.gifData.data : [];
        this.pageSize = this.gifData ? this.gifData.pagination.total_count : 0;
      })
    );
    this.subscriptions.push(
      this.searchService.onSearchTerm().subscribe( options => {
        this.termStr = options ? options.termStr : '';
        this.page = options ? options.pageNumber : 1;
      })
    );
  }

  fetchGifPages( pageNumber: number ) {
    this.searchService.search (this.termStr, pageNumber, `q=${this.termStr}&limit=20&offset=${(20 * (pageNumber - 1))}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
