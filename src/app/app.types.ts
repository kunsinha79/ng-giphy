export interface GiphyContent {
  data: Array<any> | [];
  meta: MetaContent;
  pagination: PaginationContent | undefined;
}

export interface MetaContent {
  status: number | null;
  msg: string;
  response_id: string;
}
export interface PaginationContent {
  count: number | null;
  offset: number | null;
  total_count: number | null;
}

export interface SearchOptions {
  termStr: string;
  pageNumber: number;
}
