import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentIdComponent } from './content-id.component';

describe('ContentIdComponent', () => {
  let component: ContentIdComponent;
  let fixture: ComponentFixture<ContentIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
