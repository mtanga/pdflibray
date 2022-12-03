import { TestBed } from '@angular/core/testing';

import { FirebseService } from './firebse.service';

describe('FirebseService', () => {
  let service: FirebseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
