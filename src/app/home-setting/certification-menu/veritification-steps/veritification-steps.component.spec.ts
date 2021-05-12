import { ComponentFixture, TestBed } from '@angular/core/testing'
import { VeritificationStepsComponent } from './veritification-steps.component'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VeritificationStepsComponent', () => {
  let component: VeritificationStepsComponent;
  let fixture: ComponentFixture<VeritificationStepsComponent>;
  const initialState = {};

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ VeritificationStepsComponent ],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeritificationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
