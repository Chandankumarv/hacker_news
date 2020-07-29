import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { FeedService } from 'src/app/providers/feed.service';
import { MatTableDataSource } from '@angular/material/table';
import {Story} from '../../models/story';
import {ActivatedRoute, Router} from '@angular/router';
import {LineChartComponent} from '../../modules/chart/components/line-chart/line-chart.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(LineChartComponent, {static: true}) lineChart: LineChartComponent;
  storyIds: string[] = [];
  points: number[] = [];

  dataSource = new MatTableDataSource([]);
  displayedColumns = [ 'comments', 'voteCount', 'upVotes', 'newsDetails'];

  constructor(private feedService: FeedService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getFeed();
  }

  getFeed(query: string = '', pageNo?: number) {
    if (!pageNo) {
      let pageNoFromUrl = this.route.snapshot.queryParamMap.get('page');
      pageNo = pageNoFromUrl ? JSON.parse(pageNoFromUrl) : 1;
    }
    this.feedService.getNews(query, pageNo, 20).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.hits);
      this.paginator.length = result.nbHits;
      this.paginator.pageIndex = pageNo - 1;
      this.storyIds.splice(0, this.storyIds.length);
      this.points.splice(0, this.points.length);
      result.hits.forEach(story => {
        this.storyIds.push(story.objectID);
        this.points.push(story.points);
      });
      this.lineChart.update();
    });
  }

  onPageEvent(pageEvent: PageEvent) {
    let pageNo = pageEvent.pageIndex + 1;
    this.router.navigate([], {
      queryParams: {
        page: pageNo
      }
    });
    this.getFeed('', pageNo);
  }

  getTimeDiffFromNow(time: number) {
    let timeDiff = time - Date.now();
    return new Date(timeDiff).getHours();
  }

  upVote(row: Story, currentIndex: number) {
    this.feedService.upVote(row.objectID, row.points).subscribe(updatedPoints => {
      row.points = updatedPoints;
      this.points[currentIndex] = updatedPoints;
    });
  }

  hideStory(row: Story, index: number) {
    this.feedService.hideStory(row.objectID).subscribe(hiddenStory => {
      let currentData = this.dataSource.data;
      currentData.splice(index, 1);
      this.storyIds.splice(index, 1);
      this.points.splice(index, 1);
      this.dataSource = new MatTableDataSource<any>(currentData);
      this.lineChart.update();
    });
  }
}
