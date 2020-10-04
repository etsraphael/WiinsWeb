import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTOUComponent } from './container-t-o-u.component';

describe('ContainerTOUComponent', () => {
  let component: ContainerTOUComponent;
  let fixture: ComponentFixture<ContainerTOUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerTOUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTOUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
