import { TestBed } from '@angular/core/testing';

import { FireServService } from './fire-serv.service';

describe('FireServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireServService = TestBed.get(FireServService);
    expect(service).toBeTruthy();
  });
});
