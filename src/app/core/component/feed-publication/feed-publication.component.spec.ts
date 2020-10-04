import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPublicationComponent } from './feed-publication.component';

describe('FeedPublicationComponent', () => {
  let component: FeedPublicationComponent;
  let fixture: ComponentFixture<FeedPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
