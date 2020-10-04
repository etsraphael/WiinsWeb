import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPublicationStandardComponent } from './feed-publication-standard.component';

describe('FeedPublicationStandardComponent', () => {
  let component: FeedPublicationStandardComponent;
  let fixture: ComponentFixture<FeedPublicationStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPublicationStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPublicationStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
