import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumSettingComponent } from './premium-setting.component';

describe('PremiumSettingComponent', () => {
  let component: PremiumSettingComponent;
  let fixture: ComponentFixture<PremiumSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
