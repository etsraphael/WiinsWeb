import { TestBed } from '@angular/core/testing';

import { UploadWithoutInjectorService } from './upload-without-injector.service';

describe('UploadWithoutInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadWithoutInjectorService = TestBed.get(UploadWithoutInjectorService);
    expect(service).toBeTruthy();
  });
});
