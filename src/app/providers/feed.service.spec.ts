import { TestBed } from '@angular/core/testing';

import { FeedService } from './feed.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import Func = jasmine.Func;
import {SearchResult} from '../models/search-result';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('FeedService', () => {
  let service: FeedService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(FeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return search result', (done: DoneFn) => {
    const stubValue: SearchResult = {
      hits: [
        {
          created_at: new Date('2019-01-07T17:03:59.000Z'),
          title: 'Announcing unlimited free private repos',
          url: 'https://blog.github.com/2019-01-07-new-year-new-github/',
          author: 'razer6',
          points: 2867,
          story_text: null,
          comment_text: null,
          num_comments: 685,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1546880639,
          relevancy_score: 8589,
          _tags: [
            'story',
            'author_razer6',
            'story_18847043'
          ],
          objectID: '18847043'
        },
        {
          created_at: new Date('2020-05-30T15:52:45.000Z'),
          title: 'SpaceX successfully launches two humans into orbit',
          url: 'https://www.nasa.gov/press-release/nasa-astronauts-launch-from-america-in-historic-test-flight-of-spacex-crew-dragon',
          author: 'tosh',
          points: 2856,
          story_text: null,
          comment_text: null,
          num_comments: 596,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1590853965,
          _tags: [
            'story',
            'author_tosh',
            'story_23361987'
          ],
          objectID: '23361987'
        },
      ],
      nbHits: 21702441,
      page: 1,
      nbPages: 50,
      hitsPerPage: 2,
      query: ''
    };
    const url = 'http://hn.algolia.com/api/v1/search?tags=story&query=&page=1&hitsPerPage=2';
    service.getNews('', 1, 2).subscribe(value => {
      let expectation: Partial<SearchResult> = {};
      expect(value).toBeTruthy();
      done();
    }, error => {
      console.log(error);
      done();
    });
    const req = httpTestingController.expectOne(url);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(stubValue);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});
