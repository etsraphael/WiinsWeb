import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPageAdminStandardComponent } from './feed-page-admin-standard.component';

describe('FeedPageAdminStandardComponent', () => {
  let component: FeedPageAdminStandardComponent;
  let fixture: ComponentFixture<FeedPageAdminStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPageAdminStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPageAdminStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
