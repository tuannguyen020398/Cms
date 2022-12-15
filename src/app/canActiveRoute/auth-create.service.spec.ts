import { TestBed } from '@angular/core/testing';

import { AuthCreateService } from './auth-create.service';

describe('AuthCreateService', () => {
  let service: AuthCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
