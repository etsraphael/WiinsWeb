import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDiscordComponent } from './to-discord.component';

describe('ToDiscordComponent', () => {
  let component: ToDiscordComponent;
  let fixture: ComponentFixture<ToDiscordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDiscordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDiscordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
