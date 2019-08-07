import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {GiphyContent} from '../app.types';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class AppGalleryComponent implements OnInit, OnDestroy {
  gifData: GiphyContent;
  data: Array<any>[];
  isLoading = true;
  termStr: string;
  page = 1;
  pageSize = 0;
  previousPage: number;
  unSubscribeResults = new Subject();
  unSubscribeOptions = new Subject();
  unSubscribeLoader = new Subject();

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.onSearchResults().pipe(takeUntil(this.unSubscribeResults)).subscribe(results => {
      this.gifData = results;
      this.data = this.gifData ? this.gifData.data : [];
      this.pageSize = this.gifData ? this.gifData.pagination.total_count : 0;
    });
    this.searchService.onSearchTerm().pipe(takeUntil(this.unSubscribeOptions)).subscribe( options => {
        this.termStr = options ? options.termStr : '';
        this.page = options ? options.pageNumber : 1;
        this.previousPage = 0;
    });

    this.searchService.onLoadStatus().pipe(takeUntil(this.unSubscribeLoader)).subscribe((val: boolean) => {
      this.isLoading = val;
    });
  }

  fetchGifPages( pageNumber: number ) {
    if (this.page !== this.previousPage) {
      this.previousPage = this.page;
      this.searchService.search (this.termStr, pageNumber, `q=${this.termStr}&limit=20&offset=${(20 * (pageNumber - 1))}`);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribeResults.next();
    this.unSubscribeResults.complete();
    this.unSubscribeOptions.next();
    this.unSubscribeOptions.complete();
    this.unSubscribeLoader.next();
    this.unSubscribeLoader.complete();

  }
}
