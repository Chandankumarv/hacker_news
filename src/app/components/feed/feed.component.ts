import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { FeedService } from 'src/app/providers/feed.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource([]);
  displayedColumns = [ 'comments', 'voteCount', 'upVotes', 'newsDetails'];

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getFeed();
  }

  getFeed(query: string = '', pageNo: number = 1) {
    this.feedService.getNews(query, pageNo, 20).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.hits);
      this.paginator.length = result.nbHits;
    });
  }

  onPageEvent(pageEvent: PageEvent) {
    this.getFeed('', pageEvent.pageIndex + 1);
  }

  getTimeDiffFromNow(time: number) {
    let timeDiff = time - Date.now();
    return new Date(timeDiff).getHours();
  }

}
