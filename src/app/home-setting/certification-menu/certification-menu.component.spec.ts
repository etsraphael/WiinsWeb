import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationMenuComponent } from './certification-menu.component';

describe('CertificationMenuComponent', () => {
  let component: CertificationMenuComponent;
  let fixture: ComponentFixture<CertificationMenuComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
