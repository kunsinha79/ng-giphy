import {GiphyContent, SearchOptions} from '../../app.types';
import {defer, of} from 'rxjs';

export const mockGifs: GiphyContent = {
  data: [{
    id: 1,
    images: [{
      original: {
        url: 'abc'
      }
    }]
  },
    {
      id: 1,
      images: [{
        original: {
          url: 'cde'
        }
      }]
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
export const mockGifsLargeData: GiphyContent = {
  data: [{
    id: 1,
    images: [{
      original: {
        url: 'abc'
      }
    }]
  },
    {
      id: 1,
      images: [{
        original: {
          url: 'cde'
        }
      }]
    }],
  meta: {
    status: 200,
    msg: 'Hello',
    response_id: '12345'
  },
  pagination: {
    count: 2,
    offset: 0,
    total_count: 100
  }
};
export const mockOptions: SearchOptions = {termStr: 'xyz', pageNumber: 0};
export const searchStub = {
  onSearchResults: () => of(mockGifs),
  onSearchTerm: () => of(mockOptions),
  onLoadStatus: () => of(false)
};
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
