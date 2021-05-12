import { TestBed } from '@angular/core/testing';
import { SettingUserService } from './setting-user.service';

describe('SettingUserService', () => {
  let service: SettingUserService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
