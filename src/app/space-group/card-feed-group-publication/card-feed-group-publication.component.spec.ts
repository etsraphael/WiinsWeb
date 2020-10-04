import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeedGroupPublicationComponent } from './card-feed-group-publication.component';

describe('CardFeedGroupPublicationComponent', () => {
  let component: CardFeedGroupPublicationComponent;
  let fixture: ComponentFixture<CardFeedGroupPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFeedGroupPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFeedGroupPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
