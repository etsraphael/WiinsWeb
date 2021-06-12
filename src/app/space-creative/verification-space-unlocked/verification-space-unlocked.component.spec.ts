import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationSpaceUnlockedComponent } from './verification-space-unlocked.component';

describe('VerificationSpaceUnlockedComponent', () => {
  let component: VerificationSpaceUnlockedComponent;
  let fixture: ComponentFixture<VerificationSpaceUnlockedComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationSpaceUnlockedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationSpaceUnlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
