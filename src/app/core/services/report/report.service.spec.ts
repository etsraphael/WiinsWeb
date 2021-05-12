import { TestBed } from '@angular/core/testing';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
