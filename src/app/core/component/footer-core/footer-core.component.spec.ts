import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCoreComponent } from './footer-core.component';

describe('FooterCoreComponent', () => {
  let component: FooterCoreComponent;
  let fixture: ComponentFixture<FooterCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
