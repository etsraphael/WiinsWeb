import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditMusicComponent } from './credit-music.component';

describe('CreditMusicComponent', () => {
  let component: CreditMusicComponent;
  let fixture: ComponentFixture<CreditMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
