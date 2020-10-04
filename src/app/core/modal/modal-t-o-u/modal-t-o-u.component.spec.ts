import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTOUComponent } from './modal-t-o-u.component';

describe('ModalTOUComponent', () => {
  let component: ModalTOUComponent;
  let fixture: ComponentFixture<ModalTOUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTOUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTOUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
