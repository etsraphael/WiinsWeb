import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTubePublicationComponent } from './create-tube-publication.component';

describe('CreateTubePublicationComponent', () => {
  let component: CreateTubePublicationComponent;
  let fixture: ComponentFixture<CreateTubePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTubePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTubePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
