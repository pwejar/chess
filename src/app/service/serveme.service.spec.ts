import { TestBed } from '@angular/core/testing';

import { ServemeService } from './serveme.service';

describe('ServemeService', () => {
  let service: ServemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
