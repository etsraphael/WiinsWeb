import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStoryComponent } from './page-story.component';

describe('PageStoryComponent', () => {
  let component: PageStoryComponent;
  let fixture: ComponentFixture<PageStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
