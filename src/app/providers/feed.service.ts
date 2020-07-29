import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {Observable, of} from 'rxjs';
import { SearchResult } from '../models/search-result';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Story} from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpService, private storageService: StorageService) { }

  getNews(filter: string = '', pageNo: number = 1, pageSize: number = 20): Observable<SearchResult> {
    return this.http
      .get(`http://hn.algolia.com/api/v1/search?tags=story&query=${filter}&page=${pageNo}&hitsPerPage=${pageSize}`)
      .pipe(map(response => {
        let finalList = [];
        response.hits.forEach((story: Story, index: number) => {
          if (!this.isStoryHidden(story.objectID)) {
            story.points = this.getPoints(story.objectID) || story.points;
            finalList.push(response.hits[index]);
          }
        });
        response.hits = finalList;
        return response;
      }));
  }

  upVote(id: string, currentVotes: number) {
    return this.updatePointsInStorage(id, currentVotes);
  }

  getPoints(id: string) {
    let upVotes = this.storageService.get('upVotes');
    return upVotes ? upVotes[id] : null;
  }

  updatePointsInStorage(id: string, currentVotes: number) {
    let upVotes = this.storageService.get('upVotes');
    if (upVotes) {
      let item = upVotes[id];
      upVotes[id] = item ? ++item : ++currentVotes;
    } else {
      upVotes = {
        [id]: ++currentVotes
      };
    }
    this.storageService.set('upVotes', upVotes);
    return of(upVotes[id]);
  }

  hideStory(id: string) {
    return this.addToHiddenStories(id);
  }

  addToHiddenStories(id: string) {
    let hiddenStories = this.storageService.get('hiddenStories');
    if (hiddenStories) {
      let item = hiddenStories[id];
      hiddenStories[id] = !!!item ;
    } else {
      hiddenStories = {
        [id]: true
      };
    }
    this.storageService.set('hiddenStories', hiddenStories);
    return of(hiddenStories[id]);
  }

  isStoryHidden(id: string) {
    let hiddenStories = this.storageService.get('hiddenStories');
    return hiddenStories ? hiddenStories[id] : null;
  }
}
