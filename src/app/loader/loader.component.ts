import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})

export class AppLoaderComponent implements OnInit {
  isLoading: boolean;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.onLoadStatus().subscribe((val: boolean) => {
      this.isLoading = val;
    });
  }
}
