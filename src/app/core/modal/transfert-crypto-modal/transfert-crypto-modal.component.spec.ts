import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertCryptoModalComponent } from './transfert-crypto-modal.component';

describe('TransfertCryptoModalComponent', () => {
  let component: TransfertCryptoModalComponent;
  let fixture: ComponentFixture<TransfertCryptoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertCryptoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertCryptoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
