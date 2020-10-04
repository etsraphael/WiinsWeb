import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeedPagePublicationComponent } from './card-feed-page-publication.component';

describe('CardFeedPagePublicationComponent', () => {
  let component: CardFeedPagePublicationComponent;
  let fixture: ComponentFixture<CardFeedPagePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFeedPagePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFeedPagePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
