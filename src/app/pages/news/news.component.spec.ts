import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import {FeedComponent} from '../../components/feed/feed.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChartModule} from '../../modules/chart/chart.module';
import {MatTableModule} from '@angular/material/table';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  const routes: Routes = [
    {
      path: '',
      redirectTo: 'news',
      pathMatch: 'full'
    },
    {
      path: 'news',
      component: NewsComponent
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent, FeedComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        MatToolbarModule,
        MatPaginatorModule,
        ChartModule,
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
