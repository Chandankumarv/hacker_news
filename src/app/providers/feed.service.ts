import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpService) { }

  getNews(filter: string = '', pageNo: number = 1, pageSize: number = 20): Observable<SearchResult> {
    return this.http.get(`http://hn.algolia.com/api/v1/search?query=${filter}&page=${pageNo}&hitsPerPage=${pageSize}`);
  }
}
