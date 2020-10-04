import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationModalComponent } from './publication-modal.component';

describe('PublicationModalComponent', () => {
  let component: PublicationModalComponent;
  let fixture: ComponentFixture<PublicationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
