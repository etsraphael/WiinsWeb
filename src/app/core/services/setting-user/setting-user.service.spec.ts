import { TestBed } from '@angular/core/testing';

import { SettingUserService } from './setting-user.service';

describe('SettingUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingUserService = TestBed.get(SettingUserService);
    expect(service).toBeTruthy();
  });
});
