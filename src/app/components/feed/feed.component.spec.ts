import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from '../../pages/news/news.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChartModule} from '../../modules/chart/chart.module';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
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
      declarations: [ FeedComponent ],
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
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
