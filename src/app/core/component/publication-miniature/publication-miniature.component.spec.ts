import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationMiniatureComponent } from './publication-miniature.component';

describe('PublicationMiniatureComponent', () => {
  let component: PublicationMiniatureComponent;
  let fixture: ComponentFixture<PublicationMiniatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationMiniatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationMiniatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
