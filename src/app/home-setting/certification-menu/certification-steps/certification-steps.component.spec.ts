import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationStepsComponent } from './certification-steps.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

describe('CertificationStepsComponent', () => {
  let component: CertificationStepsComponent;
  let fixture: ComponentFixture<CertificationStepsComponent>;
  const initialState = {};

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [CertificationStepsComponent],
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
        TranslateService,
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

