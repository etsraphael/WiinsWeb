import { TestBed } from '@angular/core/testing';
import { UploadWithoutInjectorService } from './upload-without-injector.service';

describe('UploadWithoutInjectorService', () => {
  let service: UploadWithoutInjectorService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
